import * as React from "react";

export default function Card({ className="", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-[var(--edufit-border)] bg-[var(--edufit-card)] p-4 shadow-sm ${className}`}
      {...props}
    />
  );
}
