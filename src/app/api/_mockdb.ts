// src/app/api/_mockdb.ts

// ==== Tipos ====
export type Activity = {
  id: string;
  title: string;
  scheduledAt: string;           // ISO
  type: 'aula' | 'treino' | 'evento';
  duration: number;              // minutos
  done: { userId: string; doneAt: string }[];
};

export type Message = {
  id: string;
  room: string;                  // ex.: 'global'
  userId: string;                // ex.: 'u1'
  content: string;
  createdAt: string;             // ISO
};

export type Profile = {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
};

// ==== Dados em memória (mock) ====
const today = new Date();
const iso = (d: Date) => d.toISOString();

export const activities: Activity[] = [
  {
    id: 'a1',
    title: 'Treino Funcional',
    scheduledAt: iso(new Date(today.getTime() + 1 * 3600_000)),
    type: 'treino',
    duration: 45,
    done: [],
  },
  {
    id: 'a2',
    title: 'Alongamento',
    scheduledAt: iso(new Date(today.getTime() + 25 * 3600_000)),
    type: 'aula',
    duration: 20,
    done: [],
  },
  {
    id: 'a3',
    title: 'Corrida Leve',
    scheduledAt: iso(new Date(today.getTime() - 2 * 24 * 3600_000)),
    type: 'treino',
    duration: 30,
    done: [{ userId: 'u1', doneAt: iso(new Date()) }],
  },
];

export const messages: Message[] = [
  { id: 'm1', room: 'global', userId: 'u1', content: 'Bem-vindo ao chat!', createdAt: iso(new Date()) },
];

export const profile: Profile = {
  id: 'u1',
  name: 'Naiara',
  email: 'naiara@example.com',
  avatarUrl: 'https://i.pravatar.cc/100?img=5',
};

// ==== Helpers para relatórios ====
export function buildProgress(days = 30) {
  const map = new Map<string, number>();
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    map.set(key, 0);
  }

  for (const a of activities) {
    for (const d of a.done) {
      const day = d.doneAt.slice(0, 10);
      if (map.has(day)) map.set(day, (map.get(day) || 0) + 1);
    }
  }

  return Array.from(map.entries()).map(([date, value]) => ({ date, value }));
}

