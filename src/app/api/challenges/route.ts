import { NextResponse } from 'next/server';

let challenges = [
  { id: 'c1', title: 'Corrida 5km', participants: 12, badge: '🏆' },
  { id: 'c2', title: 'Desafio Flexões', participants: 8, badge: '🥇' },
];

export async function GET() {
  return NextResponse.json(challenges);
}

export async function POST(req: Request) {
  const body = await req.json();
  const c = { id: Date.now().toString(), participants: 0, badge: '🎖️', ...body };
  challenges = [c, ...challenges];
  return NextResponse.json(c, { status: 201 });
}

