import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, message: 'Use POST /api/login com { email }' });
}

export async function POST(req: Request) {
  const { email } = await req.json();
  return NextResponse.json({
    token: 'mock-token-123',
    user: { id: 'u1', name: 'Naiara', email, role: 'student' },
  });
}
