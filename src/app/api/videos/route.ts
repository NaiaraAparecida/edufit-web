import { NextResponse } from 'next/server';

const videos = [
  { id: 'v1', title: 'Alongamento Completo', uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 'v2', title: 'Treino de Força',      uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
];

export async function GET() {
  return NextResponse.json(videos);
}
