import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Add runtime configuration
export const runtime = 'edge';

export async function POST(request: Request) {
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // Handle OPTIONS request
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { headers });
  }

  try {
    const body = await request.json();
    const { twitter, wallet } = body;

    if (!twitter || !wallet) {
      return NextResponse.json(
        { message: 'Twitter and wallet are required' },
        { status: 400, headers }
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
        { status: 500, headers }
      );
    }

    return NextResponse.json(
      { message: 'Application received successfully' },
      { status: 200, headers }
    );
  } catch (error) {
    console.error('Whitelist application error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500, headers }
    );
  }
} 