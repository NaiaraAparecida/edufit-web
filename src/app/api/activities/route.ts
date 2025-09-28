import { NextResponse } from 'next/server';
import { activities } from '../_mockdb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const from = searchParams.get('from') ? new Date(String(searchParams.get('from'))) : null;
  const to   = searchParams.get('to')   ? new Date(String(searchParams.get('to')))   : null;

  const res = activities.filter(a => {
    const t = new Date(a.scheduledAt).getTime();
    return (!from || t >= from.getTime()) && (!to || t <= to.getTime());
  });

  return NextResponse.json(res);
}
