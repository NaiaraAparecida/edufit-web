import { NextResponse } from 'next/server';
import { profile } from '../_mockdb';

export async function GET() {
  return NextResponse.json(profile);
}

export async function PUT(req: Request) {
  const body = await req.json();
  Object.assign(profile, {
    name: body.name ?? profile.name,
    email: body.email ?? profile.email,
    avatarUrl: body.avatarUrl ?? profile.avatarUrl,
  });
  return NextResponse.json(profile);
}
