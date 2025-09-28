"use client";
import { useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);
  const canSubmit = email.trim().length > 3;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || busy) return;
    setBusy(true);
    try {
      const res = await fetch(BASE + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      // guarda token + user (mock) e segue para home
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.location.href = "/";
  } catch (err) {
    console.error("LOGIN_ERROR:", err);
    alert("Não foi possível entrar. Confira sua conexão e tente novamente.");
  } finally {
      setBusy(false);
    }
  }

  function forgot() {
    if (!email.trim()) return alert("Digite seu e-mail para recuperar a senha.");
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
        style={{ background: "color-mix(in srgb, var(--edufit-primary,#0A4C86) 0%, white)" }}
      >
        <h2 className="mb-1 text-xl font-bold">Entrar</h2>
        <p className="mb-4 text-sm text-slate-600">Acesse sua conta EduFit</p>

        <form className="space-y-3" onSubmit={submit}>
          <div>
            <label className="mb-1 block text-sm text-slate-600">E-mail</label>
            <input
              className="h-10 w-full rounded-md border px-3"
              placeholder="voce@exemplo.com"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm text-slate-600">Senha</label>
            <input
              className="h-10 w-full rounded-md border px-3"
              placeholder="••••••••"
              type="password"
              autoComplete="current-password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
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

          <button
            type="submit"
            disabled={!canSubmit || busy}
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[var(--edufit-accent,#FF7A00)] px-4 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "Entrando…" : "Entrar"}
          </button>
        </form>

        <div className="my-4 h-px bg-[var(--edufit-border,#E2E8F0)]" />

        <p className="text-center text-sm text-slate-600">
          Não tem conta?{" "}
          <a
            href="/register"
            className="font-semibold text-[var(--edufit-primary,#0A4C86)] hover:underline"
          >
            Criar conta
          </a>
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} EduFit
      </p>
    </div>
  );
}
