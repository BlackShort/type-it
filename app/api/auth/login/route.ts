import { NextResponse } from 'next/server';
import { validateUser } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
  }

  const isValid = validateUser(email, password);

  if (isValid) {
    // In a real application, you would create a session or JWT here
    return NextResponse.json({ success: true, message: 'Login successful' });
  } else {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }
}

