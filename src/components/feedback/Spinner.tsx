'use client';
import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

type Props = {
  label?: string;         // texto acessível (screen readers)
  size?: 'sm' | 'md' | 'lg';
} & HTMLAttributes<HTMLDivElement>;

export default function Spinner({ label = 'Carregando…', size = 'md', className, ...rest }: Props) {
  const dim = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6';

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={clsx('inline-flex items-center gap-2 text-slate-600', className)}
      {...rest}
    >
      <span
        className={clsx(
          'animate-spin rounded-full border-2 border-[var(--edufit-primary,#0A4C86)] border-t-transparent',
          dim
        )}
      />
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">{label}</span>
    </div>
  );
}
