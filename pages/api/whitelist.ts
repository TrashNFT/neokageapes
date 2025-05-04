import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  try {
    const { twitter, wallet } = req.body;

    if (!twitter || !wallet) {
      return res.status(400).json({ message: 'Twitter and wallet are required' });
    }

    // Here you would typically:
    // 1. Validate the wallet address
    // 2. Store the application in a database
    // 3. Send confirmation emails, etc.

    return res.status(200).json({ message: 'Application received successfully' });
  } catch (error) {
    console.error('Whitelist application error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 