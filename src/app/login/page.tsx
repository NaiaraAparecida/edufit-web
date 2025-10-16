'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = email.trim().length > 3 && pass.trim().length >= 6;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || busy) return;

    setBusy(true);
    setError(null);

    try {
      // Usa o AuthContext — ele já salva token/user como 'edufit:*' e trata storage
      await login(email.trim(), pass.trim());
      router.push('/');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Não foi possível entrar.';
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  function forgot() {
    if (!email.trim()) {
      alert('Digite seu e-mail para recuperar a senha.');
      return;
    }
    alert(`Se o e-mail ${email.trim()} estiver cadastrado, enviaremos instruções.`);
  }

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-md place-content-center px-4">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-[var(--edufit-primary,#0A4C86)]" />
        <h1 className="text-2xl font-bold text-[var(--edufit-primary,#0A4C86)]">EduFit</h1>
      </div>

      <div
        className="rounded-2xl border border-[var(--edufit-border,#E2E8F0)] bg-white p-6 shadow-sm"
        style={{ background: 'color-mix(in srgb, var(--edufit-primary,#0A4C86) 0%, white)' }}
      >
        <h2 className="mb-1 text-xl font-bold">Entrar</h2>
        <p className="mb-4 text-sm text-slate-600">Acesse sua conta EduFit</p>

        <form className="space-y-3" onSubmit={submit} noValidate>
          <div>
            <label className="mb-1 block text-sm text-slate-600" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              className="h-10 w-full rounded-md border px-3"
              placeholder="voce@exemplo.com"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-600" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              className="h-10 w-full rounded-md border px-3"
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="h-4 w-4" /> Lembrar de mim
            </label>
            <button
              type="button"
              onClick={forgot}
              className="text-sm font-semibold text-[var(--edufit-primary,#0A4C86)] hover:underline"
            >
              Esqueci a senha
            </button>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={!canSubmit || busy}
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[var(--edufit-accent,#FF7A00)] px-4 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {busy ? 'Entrando…' : 'Entrar'}
          </button>
        </form>

        <div className="my-4 h-px bg-[var(--edufit-border,#E2E8F0)]" />

        <p className="text-center text-sm text-slate-600">
          Não tem conta?{' '}
          <Link
            href="/register"
            className="font-semibold text-[var(--edufit-primary,#0A4C86)] hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} EduFit
      </p>
    </div>
  );
}

