import { NextResponse } from 'next/server';
import { activities } from '../../../_mockdb';

export async function POST(req: Request, ctx: { params: { id: string } }) {
  const id = ctx.params.id;
  const { userId = 'u1' } = await req.json().catch(() => ({}));
  const act = activities.find(a => a.id === id);
  if (!act) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  act.done.push({ userId, doneAt: new Date().toISOString() });
  return NextResponse.json({ ok: true, act });
}
