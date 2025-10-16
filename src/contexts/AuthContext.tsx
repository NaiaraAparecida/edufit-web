'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '@/lib/api';

type User = { id: string; name: string; email: string };

type AuthCtx = {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = localStorage.getItem('edufit:token');
    const u = localStorage.getItem('edufit:user');
    if (t && u) {
      setToken(t);
      setUser(JSON.parse(u) as User);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post<{ token: string; user: User }>('/api/login', { email, password });
    localStorage.setItem('edufit:token', res.token);
    localStorage.setItem('edufit:user', JSON.stringify(res.user));
    setToken(res.token);
    setUser(res.user);
  };

  const logout = () => {
    localStorage.removeItem('edufit:token');
    localStorage.removeItem('edufit:user');
    setToken(null);
    setUser(null);
    window.location.href = '/';
  };

  const value: AuthCtx = useMemo(
    () => ({ user, token, loading, login, logout }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = (): AuthCtx => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within <AuthProvider>');
  }
  return ctx;
};
