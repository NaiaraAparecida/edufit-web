'use client';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div className="sticky top-0 z-50 border-b border-[var(--edufit-border)] bg-white">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-[var(--edufit-primary)]" />
          <span className="font-bold text-[var(--edufit-primary)]">EduFit</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link className="hover:text-[var(--edufit-primary)]" href="/videos">Vídeos</Link>
          <Link className="hover:text-[var(--edufit-primary)]" href="/challenges">Desafios</Link>
          <Link className="hover:text-[var(--edufit-primary)]" href="/reports">Relatórios</Link>
          <Link className="hover:text-[var(--edufit-primary)]" href="/chat">Chat</Link>

          {user ? (
            <>
              <Link className="hover:text-[var(--edufit-primary)]" href="/profile">
                {user.name?.split(' ')[0] || 'Perfil'}
              </Link>
              <button
                onClick={logout}
                className="rounded bg-[var(--edufit-primary)] px-3 py-1 text-white hover:opacity-90"
                aria-label="Sair"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              className="rounded bg-[var(--edufit-primary)] px-3 py-1 text-white hover:opacity-90"
              href="/login"
            >
              Entrar
            </Link>
          )}
        </nav>
      </div>
    </div>
  );
}
