import { NextResponse } from 'next/server';

const rules: Array<{ test: RegExp; reply: string }> = [
  { test: /alongamento|stretch/i, reply: 'Faça alongamento de 5–7 minutos: pescoço, ombros, posterior e panturrilha.' },
  { test: /força|musculação/i,   reply: 'Treino de força sugerido: 3x na semana, 6–8 exercícios, 3 séries de 8–12 reps.' },
  { test: /corrida|run/i,        reply: 'Comece com 20 min leve, 3x semana. Progrida +10% por semana.' },
];

export async function POST(req: Request) {
  const { prompt = '' } = await req.json();
  const rule = rules.find(r => r.test.test(prompt));
  const reply = rule?.reply ?? 'Posso ajudar com alongamento, força ou corrida. O que você quer trabalhar hoje?';
  return NextResponse.json({ reply });
}
