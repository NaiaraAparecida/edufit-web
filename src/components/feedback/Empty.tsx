'use client';
import type { ReactNode } from 'react';
import clsx from 'clsx';

type Props = {
  title?: string;
  description?: string;
  action?: ReactNode;       // botão/link opcional
  className?: string;
};

export default function Empty({
  title = 'Nada por aqui ainda',
  description = 'Quando houver conteúdo, ele aparecerá nesta seção.',
  action,
  className,
}: Props) {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-[var(--edufit-border,#E2E8F0)] bg-white p-6 text-center',
        className
      )}
    >
      <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full border text-[var(--edufit-muted,#64748B)]">
        {/* ícone simples */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-[var(--edufit-muted,#64748B)]">{description}</p>
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
