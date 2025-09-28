"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Profile = { name: string; avatarUrl?: string | null };
const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function ProfilePage() {
  const [form, setForm] = useState<Profile>({ name: "", avatarUrl: "" });
  const [busy, setBusy] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(BASE + "/api/me")
      .then((r) => r.json() as Promise<Profile>)
      .then((p) => setForm({ name: p.name, avatarUrl: p.avatarUrl ?? "" }))
      .finally(() => setBusy(false));
  }, []);

  const save = async () => {
    setSaving(true);
    const r = await fetch(BASE + "/api/me", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const p = (await r.json()) as Profile;
    setForm({ name: p.name, avatarUrl: p.avatarUrl ?? "" });
    setSaving(false);
    alert("Perfil atualizado!");
  };

  if (busy) return <p>Carregando…</p>;

  return (
    <div className="max-w-xl space-y-3">
      <h2 className="text-xl font-bold text-[var(--edufit-primary,#0A4C86)]">Meu Perfil</h2>

      {form.avatarUrl ? (
        <div className="h-20 w-20 overflow-hidden rounded-full border">
          {/* ✅ Next Image com width/height para performance */}
          <Image
            src={form.avatarUrl}
            alt="Avatar"
            width={80}
            height={80}
            className="h-20 w-20 object-cover"
          />
        </div>
      ) : (
        <div className="h-20 w-20 rounded-full border bg-slate-50" />
      )}

      <label className="text-sm text-[var(--edufit-muted,#64748B)]">Nome</label>
      <input
        className="h-10 w-full rounded-md border px-3"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <label className="text-sm text-[var(--edufit-muted,#64748B)]">Avatar URL</label>
      <input
        className="h-10 w-full rounded-md border px-3"
        value={form.avatarUrl ?? ""}
        onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
      />

      <button
        onClick={save}
        disabled={saving}
        className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--edufit-accent,#FF7A00)] px-4 font-semibold text-white hover:opacity-90 disabled:opacity-50"
      >
        Salvar
      </button>
    </div>
  );
}

