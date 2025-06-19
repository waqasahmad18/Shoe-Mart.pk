import { NextRequest, NextResponse } from 'next/server';

const ADMIN_EMAIL = 'admin@shoemart.pk';
const ADMIN_PASSWORD = 'admin123';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    // In production, set a secure cookie or JWT here
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
} 