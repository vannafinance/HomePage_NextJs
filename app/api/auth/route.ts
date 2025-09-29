import { supabase } from "@/lib/supabase";
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

        // Only sign in after sign-up if email confirmation is NOT required
        ({ data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({ email, password }));
        if (signInError) throw signInError;
      } else {
        throw signInError;
      }
    }

    return NextResponse.json({ message: signInData, status: 200 });
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Authentication failed";
    console.error("Auth API error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
