import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { twitter, wallet } = body;

    if (!twitter || !wallet) {
      return NextResponse.json(
        { message: 'Twitter and wallet are required' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Validate the wallet address
    // 2. Store the application in a database
    // 3. Send confirmation emails, etc.

    return NextResponse.json(
      { message: 'Application received successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Whitelist application error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 