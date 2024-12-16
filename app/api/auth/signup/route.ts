import { NextResponse } from 'next/server';
import { createUser } from '@/lib/auth';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ success: false, message: 'Email and password are required' }, { status: 400 });
  }

  const success = createUser(email, password);

  if (success) {
    return NextResponse.json({ success: true, message: 'User created successfully' });
  } else {
    return NextResponse.json({ success: false, message: 'User already exists' }, { status: 400 });
  }
}

