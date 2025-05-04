import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Remove dynamic and runtime exports
// export const dynamic = 'force-dynamic';
// export const runtime = 'edge';

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

    const { data, error } = await supabase
      .from('whitelist_applications')
      .insert([
        {
          twitter_handle: twitter,
          wallet_address: wallet,
          status: 'pending',
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { message: 'Failed to store application' },
        { status: 500 }
      );
    }

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