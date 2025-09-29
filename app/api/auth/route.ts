import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
  const email = process.env.NEXT_SUPABASE_USER_EMAIL;
  const password = process.env.NEXT_SUPABASE_USER_PASSWORD;

  if (!email || !password) {
    return NextResponse.json({ message: "Email and password not found" }, { status: 500 });
  }

  try {
    // Try signing in first
    let { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      // If user doesn't exist, create it
      if (signInError.message.includes("Invalid login credentials")) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({ email, password });
        if (signUpError) throw signUpError;

        // Only sign in after sign-up if email confirmation is NOT required
        ({ data: signInData, error: signInError } = await supabase.auth.signInWithPassword({ email, password }));
        if (signInError) throw signInError;
      } else {
        throw signInError;
      }
    }

    return NextResponse.json({ message: signInData, status: 200 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Auth API error:", err.message);
    return NextResponse.json({ error: err.message || 'Authentication failed' }, { status: 500 });
  }
}
