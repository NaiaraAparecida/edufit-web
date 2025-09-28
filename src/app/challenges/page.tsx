"use client";
import { useEffect, useState } from "react";
import PageTitle from "../_ui/PageTitle";
import Button from "../_ui/Button";
import Card from "../_ui/Card";
import Badge from "../_ui/Badge";

type Challenge = { id:string; title:string; participants?:number; badge?:string };
const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function ChallengesPage() {
  const [list, setList] = useState<Challenge[]>([]);
  const [title, setTitle] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => fetch(BASE + "/api/challenges").then(r=>r.json()).then(setList);
  useEffect(()=>{ load(); },[]);

  const add = async () => {
    if (!title.trim()) return;
    setBusy(true);
    const r = await fetch(BASE + "/api/challenges", {
      method:"POST", headers:{ "Content-Type":"application/json" },
      body: JSON.stringify({ title: title.trim() })
    });
    const c = await r.json();
    setList(prev => [c, ...prev]);
    setTitle(""); setBusy(false);
  };

  return (
    <div>
      <PageTitle>Desafios</PageTitle>
      <div className="mb-3 flex gap-2">
        <input className="h-10 flex-1 rounded-md border px-3"
               placeholder="Novo desafio (ex.: Corrida 5km)"
               value={title} onChange={e=>setTitle(e.target.value)} />
        <Button onClick={add} disabled={busy}>Adicionar</Button>
      </div>

      <ul className="space-y-3">
        {list.map(item=>(
          <li key={item.id}>
            <Card>
              <div className="font-semibold">{item.title}</div>
              <div className="mt-2 flex gap-2 text-sm">
                <Badge tone="brand">{item.participants ?? 0} participantes</Badge>
                {item.badge ? <Badge tone="warning">{item.badge}</Badge> : null}
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
