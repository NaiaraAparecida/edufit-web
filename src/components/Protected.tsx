'use client';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Protected({ children }: { children: React.ReactNode }) {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) router.replace('/login'); // ajuste para rota real
  }, [loading, token, router]);

  if (loading) return <div className="p-6">Carregando...</div>;
  return <>{children}</>;
}
