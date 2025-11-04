import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseAdmin = createClient(
  process.env.NEXT_SUPABASE_URL!,
  process.env.NEXT_API_KEY! // ⚠️ server-only
);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { evm_address } = body;

    if (!evm_address) {
      return NextResponse.json(
        { error: 'EVM address is required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabaseAdmin
      .from('waitlist')
      .select('id,email')
      .eq('evm_address', evm_address);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (data && data.length > 0) {
      return NextResponse.json({
        exists: true,
        message: `EVM Address exists in waitlist! Email: ${data[0].email}`,
      });
    }

    return NextResponse.json({
      exists: false,
      message: 'EVM Address not found in waitlist.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

