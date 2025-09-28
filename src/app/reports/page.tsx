"use client";
import { useEffect, useState } from "react";
import PageTitle from "../_ui/PageTitle";
import Card from "../_ui/Card";

type KPI = { id:string; label:string; value:number };
type Point = { date:string; value:number };
const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function ReportsPage() {
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [series, setSeries] = useState<Point[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    Promise.all([
      fetch(BASE + "/api/reports/summary").then(r=>r.json()),
      fetch(BASE + "/api/reports/progress?range=30d").then(r=>r.json()),
    ]).then(([s1,s2])=>{
      setKpis(s1.kpis||[]); setSeries(s2.series||[]); setLoading(false);
    });
  },[]);

  if (loading) return <p>Carregando…</p>;

  return (
    <div>
      <PageTitle>Relatórios</PageTitle>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
        {kpis.map(k=>(
          <Card key={k.id}>
            <div className="text-sm text-[var(--edufit-muted)]">{k.label}</div>
            <div className="mt-1 text-xl font-bold">{k.value}</div>
          </Card>
        ))}
      </div>

      <h3 className="mt-6 mb-2 font-semibold">Progresso (30d)</h3>
      <Card>
        <div className="grid grid-cols-2 gap-1 text-sm">
          {series.map(p=>(
            <div key={p.date} className="flex justify-between border-b border-[var(--edufit-border)] py-1">
              <span className="text-[var(--edufit-muted)]">{p.date}</span>
              <span className="font-medium">{p.value}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
