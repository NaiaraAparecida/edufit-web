// edufit-web/src/components/ThemeToggle.tsx
'use client';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = saved ? saved === 'dark' : prefers;
    setDark(initial);
    document.documentElement.classList.toggle('dark', initial);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <button
      onClick={toggle}
      className="px-md py-sm rounded-md bg-card text-text shadow-card border border-border"
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
}
