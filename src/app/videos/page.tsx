'use client';
import { useEffect, useState } from 'react';
import PageTitle from '../_ui/PageTitle';
import Card from '../_ui/Card';
import { api } from '@/lib/api';
import Spinner from '@/components/feedback/Spinner';
import Empty from '@/components/feedback/Empty';
import ErrorMessage from '@/components/feedback/ErrorMessage';

type Video = { id: string; title: string; uri: string };

export default function VideosPage() {
  const [items, setItems] = useState<Video[]>([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      const data = await api.get<Video[]>(
        `/api/videos${q ? `?q=${encodeURIComponent(q)}` : ''}`
      );
      const filtered =
        q.trim().length > 0
          ? data.filter((v) =>
              v.title.toLowerCase().includes(q.trim().toLowerCase())
            )
          : data;
      setItems(filtered);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Erro ao carregar vídeos';
      setErr(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-4">
      <PageTitle>Vídeos</PageTitle>

      <div className="flex gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por título…"
          className="h-10 w-full max-w-sm rounded-md border px-3"
          aria-label="Buscar vídeos"
        />
        <button
          onClick={load}
          className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--edufit-primary,#0A4C86)] px-4 font-semibold text-white hover:opacity-90"
        >
          Filtrar
        </button>
      </div>

      {loading && <Spinner label="Carregando vídeos…" />}
      {err && <ErrorMessage message={err} />}
      {!loading && !err && items.length === 0 && (
        <Empty
          title="Nenhum vídeo encontrado"
          description="Tente ajustar a busca ou volte mais tarde."
        />
      )}

      {!loading && !err && items.length > 0 && (
        <ul className="space-y-3">
          {items.map((v) => (
            <li key={v.id}>
              <Card>
                <div className="font-semibold">{v.title}</div>
                <video
                  src={v.uri}
                  controls
                  className="mt-2 w-full rounded-md border"
                />
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}




