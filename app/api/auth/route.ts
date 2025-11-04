import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  const email = process.env.NEXT_SUPABASE_USER_EMAIL;
  const password = process.env.NEXT_SUPABASE_USER_PASSWORD;

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password not found" },
      { status: 500 }
    );
  }

  try {
    const supabaseUrl = process.env.NEXT_SUPABASE_URL!;
    const supabaseServiceKey = process.env.NEXT_API_KEY!;

    // Create Supabase client for server-side auth
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });

    // Try signing in first
    let { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      // If user doesn't exist, create it
      if (signInError.message.includes("Invalid login credentials")) {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
        });
        if (signUpError) throw signUpError;

        // Sign in after sign-up
        ({ data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({ email, password }));
        if (signInError) throw signInError;
      } else {
        throw signInError;
      }
    }

    // Set session cookies
    if (signInData.session) {
      const response = NextResponse.json({ message: signInData, status: 200 });
      
      // Set auth cookies
      response.cookies.set({
        name: 'sb-access-token',
        value: signInData.session.access_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      response.cookies.set({
        name: 'sb-refresh-token',
        value: signInData.session.refresh_token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ message: signInData, status: 200 });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Authentication failed";
    console.error("Auth API error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
