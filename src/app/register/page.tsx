"use client";
import { useState } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [busy, setBusy] = useState(false);

  const canSubmit = name.trim().length > 1 && email.trim().length > 3;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || busy) return;
    setBusy(true);
    try {
      // mock de “criar conta” -> usa o mesmo /api/login e injeta o nome
      const res = await fetch(BASE + "/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      const user = { ...data.user, name: name.trim() };

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));
      window.location.href = "/";
  } catch (err) {
    console.error("LOGIN_ERROR:", err);
    alert("Não foi possível entrar. Confira sua conexão e tente novamente.");
  } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-md place-content-center px-4">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-[var(--edufit-primary,#0A4C86)]" />
        <h1 className="text-2xl font-bold text-[var(--edufit-primary,#0A4C86)]">EduFit</h1>
      </div>

      <div className="rounded-2xl border border-[var(--edufit-border,#E2E8F0)] bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-xl font-bold">Criar conta</h2>
        <p className="mb-4 text-sm text-slate-600">Junte-se ao EduFit</p>

        <form className="space-y-3" onSubmit={submit}>
          <div>
            <label className="mb-1 block text-sm text-slate-600">Nome</label>
            <input
              className="h-10 w-full rounded-md border px-3"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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
              autoComplete="new-password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!canSubmit || busy}
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[var(--edufit-accent,#FF7A00)] px-4 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {busy ? "Criando…" : "Criar conta"}
          </button>
        </form>

        <div className="my-4 h-px bg-[var(--edufit-border,#E2E8F0)]" />

        <p className="text-center text-sm text-slate-600">
          Já tem conta?{" "}
          <a
            href="/login"
            className="font-semibold text-[var(--edufit-primary,#0A4C86)] hover:underline"
          >
            Entrar
          </a>
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} EduFit
      </p>
    </div>
  );
}
