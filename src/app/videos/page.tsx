"use client";
import { useEffect, useState } from "react";
import PageTitle from "../_ui/PageTitle";
import Card from "../_ui/Card";

type Video = { id:string; title:string; uri:string };
const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function VideosPage() {
  const [items, setItems] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(BASE + "/api/videos").then(r=>r.json()).then(setItems).finally(()=>setLoading(false));
  }, []);

  return (
    <div>
      <PageTitle>Vídeos</PageTitle>
      {loading ? <p>Carregando…</p> : (
        <ul className="space-y-3">
          {items.map(v => (
            <li key={v.id}>
              <Card>
                <div className="font-semibold">{v.title}</div>
                <video src={v.uri} controls className="mt-2 w-full rounded-md border" />
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


