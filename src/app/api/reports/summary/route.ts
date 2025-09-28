import { NextResponse } from 'next/server';
import { activities } from '../../_mockdb';

export async function GET() {
  const total = activities.length;
  const done  = activities.reduce((acc, a) => acc + a.done.length, 0);
  const completionRate = total ? Math.round((done / total) * 100) : 0;

  const last7 = new Date(); last7.setDate(last7.getDate() - 7);
  const done7 = activities.reduce((acc, a) =>
    acc + a.done.filter(d => new Date(d.doneAt) >= last7).length, 0);

  const kpis = [
    { id: 'k1', label: 'Atividades planejadas', value: total },
    { id: 'k2', label: 'Concluídas',            value: done },
    { id: 'k3', label: 'Conclusão (%)',         value: completionRate },
    { id: 'k4', label: 'Concluídas (7d)',       value: done7 },
  ];

  return NextResponse.json({ kpis });
}
