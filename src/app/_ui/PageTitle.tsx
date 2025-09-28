import * as React from "react";

export default function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-xl font-bold text-[var(--edufit-primary)]">
      {children}
    </h2>
  );
}
