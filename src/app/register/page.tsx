'use client';
import { useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/lib/api';

const schema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    try {
      // backend esperado (mock ou real)
      await api.post('/api/register', data);
      // após criar conta, redireciona para login
      window.location.href = '/login';
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : 'Não foi possível concluir o cadastro.';
      setServerError(msg);
    }
  };

  return (
    <div className="mx-auto grid min-h-[70vh] max-w-md place-content-center px-4">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-8 w-8 rounded-md bg-[var(--edufit-primary,#0A4C86)]" />
        <h1 className="text-2xl font-bold text-[var(--edufit-primary,#0A4C86)]">EduFit</h1>
      </div>

      <div className="rounded-2xl border border-[var(--edufit-border,#E2E8F0)] bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-xl font-bold">Criar conta</h2>
        <p className="mb-4 text-sm text-slate-600">Junte-se ao EduFit</p>

        <form className="space-y-3" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <label htmlFor="name" className="mb-1 block text-sm text-slate-600">
              Nome
            </label>
            <input
              id="name"
              className="h-10 w-full rounded-md border px-3"
              placeholder="Seu nome"
              {...register('name')}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-slate-600">
              E-mail
            </label>
            <input
              id="email"
              className="h-10 w-full rounded-md border px-3"
              placeholder="voce@exemplo.com"
              type="email"
              autoComplete="email"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-slate-600">
              Senha
            </label>
            <input
              id="password"
              className="h-10 w-full rounded-md border px-3"
              placeholder="••••••••"
              type="password"
              autoComplete="new-password"
              {...register('password')}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          {serverError && (
            <p className="text-sm text-red-600">{serverError}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[var(--edufit-accent,#FF7A00)] px-4 font-semibold text-white hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? 'Criando…' : 'Criar conta'}
          </button>
        </form>

        <div className="my-4 h-px bg-[var(--edufit-border,#E2E8F0)]" />

        <p className="text-center text-sm text-slate-600">
          Já tem conta?{' '}
          <Link
            href="/login"
            className="font-semibold text-[var(--edufit-primary,#0A4C86)] hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>

      <p className="mt-6 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} EduFit
      </p>
    </div>
  );
}

