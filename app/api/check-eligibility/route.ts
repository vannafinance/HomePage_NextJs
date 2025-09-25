// app/api/check-eligibility/route.ts
import { NextResponse } from 'next/server';
import { checkUserEligibility } from '@/lib/galxe-queries';

export async function POST(request: Request) {
  const { questId, userAddress } = await request.json();

  if (!questId || !userAddress) {
    return NextResponse.json({ error: 'questId and userAddress are required' }, { status: 400 });
  }

  const accessToken = process.env.NEXT_GALAXE_ACCESSTOKEN;
  if (!accessToken) {
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const eligibility = await checkUserEligibility(questId, userAddress, accessToken);
    return NextResponse.json(eligibility);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}