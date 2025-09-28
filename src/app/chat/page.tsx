"use client";
import { useEffect, useRef, useState } from "react";

type Msg = {
  id: string | number;
  room: string;
  userId: string;
  content: string;
  createdAt: string;
};

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");

  // ✅ Tipagem correta para setInterval
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = () =>
    fetch(BASE + "/api/messages?room=global")
      .then((r) => r.json() as Promise<Msg[]>)
      .then(setMsgs)
      .catch(() => {});

  useEffect(() => {
    load();
    timer.current = setInterval(load, 4000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  async function send() {
    if (!text.trim()) return;
    await fetch(BASE + "/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room: "global", userId: "u1", content: text.trim() }),
    });
    setText("");
    load();
  }

  return (
    <div>
      <h2 className="mb-3 text-xl font-bold text-[var(--edufit-primary,#0A4C86)]">Chat</h2>

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

      <div className="flex gap-2">
        <input
          className="h-10 flex-1 rounded-md border px-3"
          placeholder="Escreva uma mensagem…"
          value={text}
          onChange={(e) => setText(e.target.value)}
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

