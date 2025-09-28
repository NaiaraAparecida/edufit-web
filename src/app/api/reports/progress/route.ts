import { NextResponse } from 'next/server';
import { buildProgress } from '../../_mockdb';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const range = String(searchParams.get('range') || '30d');
  const days = Number(range.replace('d','')) || 30;
  const series = buildProgress(days);
  return NextResponse.json({ series });
}
