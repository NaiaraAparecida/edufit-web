'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { api } from '@/lib/api';

type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
};

export default function ProfilePage() {
  const [form, setForm] = useState<User | null>(null);
  const [busy, setBusy] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const me = await api.get<User>('/api/me');
        if (mounted) setForm({ ...me, avatarUrl: me.avatarUrl ?? '' });
      } catch (e: unknown) {
        const m = e instanceof Error ? e.message : 'Falha ao carregar perfil.';
        if (mounted) setErr(m);
      } finally {
        if (mounted) setBusy(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const save = async () => {
    if (!form) return;
    setSaving(true);
    setMsg(null);
    setErr(null);
    try {
      const updated = await api.put<User>('/api/me', {
        name: form.name,
        email: form.email,
        avatarUrl: form.avatarUrl || null,
      });
      setForm({ ...updated, avatarUrl: updated.avatarUrl ?? '' });
      setMsg('Salvo!');
    } catch (e: unknown) {
      const m = e instanceof Error ? e.message : 'Não foi possível salvar.';
      setErr(m);
    } finally {
      setSaving(false);
    }
  };

  if (busy) return <p>Carregando…</p>;
  if (err && !form) return <p className="text-red-600">{err}</p>;
  if (!form) return null;

  return (
    <div className="max-w-xl space-y-3">
      <h2 className="text-xl font-bold text-[var(--edufit-primary,#0A4C86)]">Meu Perfil</h2>

      {form.avatarUrl ? (
        <div className="h-20 w-20 overflow-hidden rounded-full border">
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

      <label className="text-sm text-[var(--edufit-muted,#64748B)]" htmlFor="name">Nome</label>
      <input
        id="name"
        className="h-10 w-full rounded-md border px-3"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <label className="text-sm text-[var(--edufit-muted,#64748B)]" htmlFor="email">E-mail</label>
      <input
        id="email"
        className="h-10 w-full rounded-md border px-3"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />

      <label className="text-sm text-[var(--edufit-muted,#64748B)]" htmlFor="avatar">Avatar URL</label>
      <input
        id="avatar"
        className="h-10 w-full rounded-md border px-3"
        value={form.avatarUrl ?? ''}
        onChange={(e) => setForm({ ...form, avatarUrl: e.target.value })}
      />

      <div className="flex items-center gap-3 pt-2">
        <button
          onClick={save}
          disabled={saving}
          className="inline-flex h-10 items-center justify-center rounded-md bg-[var(--edufit-accent,#FF7A00)] px-4 font-semibold text-white hover:opacity-90 disabled:opacity-50"
        >
          {saving ? 'Salvando…' : 'Salvar'}
        </button>
        {msg && <span className="text-sm text-green-600">{msg}</span>}
        {err && <span className="text-sm text-red-600">{err}</span>}
      </div>
    </div>
  );
}


