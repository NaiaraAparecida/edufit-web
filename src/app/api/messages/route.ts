import { NextResponse } from 'next/server';
import { messages } from '../_mockdb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const room = String(searchParams.get('room') || 'global');
  const after = searchParams.get('after'); // ISO opcional
  const list = messages
    .filter(m => m.room === room)
    .filter(m => !after || new Date(m.createdAt) > new Date(after))
    .slice(-50);
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const { room = 'global', userId = 'u1', content = '' } = await req.json();
  const msg = { id: Date.now().toString(), room, userId, content, createdAt: new Date().toISOString() };
  messages.push(msg);
  return NextResponse.json(msg, { status: 201 });
}
