'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { api } from '@/lib/api';
import Spinner from '@/components/feedback/Spinner';
import Empty from '@/components/feedback/Empty';
import ErrorMessage from '@/components/feedback/ErrorMessage';

type Msg = {
  id: string | number;
  room: string;
  userId: string;
  content: string;
  createdAt: string;
};

export default function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const endRef = useRef<HTMLDivElement | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await api.get<Msg[]>('/api/messages?room=global');
      setMsgs(data);
      setErr(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Erro ao carregar mensagens';
      setErr(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
    pollRef.current = setInterval(load, 8000);
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [load]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs]);

  const send = async () => {
    const value = text.trim();
    if (!value) return;
    setText('');
    try {
      await api.post('/api/messages', {
        room: 'global',
        userId: 'u1', // TODO: substituir pelo userId do AuthContext
        content: value,
      });
      await load();
    } catch {
      setText(value); // restaura o texto se falhar
    }
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-3">
      <h2 className="mb-3 text-xl font-bold text-[var(--edufit-primary,#0A4C86)]">Chat</h2>

      {loading && <Spinner label="Carregando mensagens…" />}
      {err && <ErrorMessage message={err} />}

      {!loading && !err && msgs.length === 0 && (
        <Empty
          title="Sem mensagens ainda"
          description="Envie a primeira mensagem para iniciar a conversa."
        />
      )}

      {!loading && !err && msgs.length > 0 && (
        <div className="h-[60vh] rounded-2xl border bg-white p-3 overflow-auto">
          <ul className="mb-3 space-y-3">
            {msgs.map((m) => (
              <li key={m.id} className="rounded-2xl border p-3">
                <div className="text-xs text-[var(--edufit-muted,#64748B)]">
                  {m.userId} • {new Date(m.createdAt).toLocaleTimeString()}
                </div>
                <div className="mt-1">{m.content}</div>
              </li>
            ))}
          </ul>
          <div ref={endRef} />
        </div>
      )}

      <div className="flex gap-2">
        <input
          className="h-10 flex-1 rounded-md border px-3"
          placeholder="Escreva uma mensagem…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Mensagem"
        />
        <button
          onClick={send}
          className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--edufit-primary,#0A4C86)] px-4 font-semibold text-white hover:opacity-90"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}




