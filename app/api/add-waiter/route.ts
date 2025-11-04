// /api/waitlist/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const supabaseAdmin = createClient(
  process.env.NEXT_SUPABASE_URL!,
  process.env.NEXT_API_KEY! // ⚠️ server-only
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { evm_address, email, discord_username, x_handle, telegram_handle } = body;

    // Validate required fields
    if (!email || !evm_address) {
      return NextResponse.json(
        { error: 'Email and EVM Address are required' },
        { status: 400 }
      );
    }

    // Get the authenticated user from the session cookies
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_SUPABASE_URL!;
    const supabaseService = process.env.NEXT_API_KEY!;
    
    // Get tokens from cookies
    const accessToken = cookieStore.get('sb-access-token')?.value;
    const refreshToken = cookieStore.get('sb-refresh-token')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated. Please log in first.' },
        { status: 401 }
      );
    }

    // Create Supabase client with the session
    const supabaseClient = createClient(supabaseUrl, supabaseService, {
      auth: {
        persistSession: false,
      },
    });

    // Set the session manually
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(accessToken);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'You must be authenticated to join the waitlist' },
        { status: 401 }
      );
    }

    // Check for existing email or EVM address
    const { data: existing, error: checkError } = await supabaseAdmin
      .from('waitlist')
      .select('id')
      .or(`email.eq.${email},evm_address.eq.${evm_address}`);

    if (checkError) {
      return NextResponse.json({ error: checkError.message }, { status: 400 });
    }

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: 'Email or EVM Address already exists in the waitlist' },
        { status: 409 }
      );
    }

    // Insert the new waitlist entry
    const { data, error } = await supabaseAdmin.from('waitlist').insert([
      {
        evm_address,
        email,
        discord_username: discord_username || null,
        x_handle: x_handle || null,
        telegram_handle: telegram_handle || null,
        user_id: user.id,
      },
    ]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: 'Successfully joined the waitlist', data },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
