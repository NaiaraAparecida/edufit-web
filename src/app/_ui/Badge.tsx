import * as React from "react";

export default function Badge({ children, tone="brand" }: { children: React.ReactNode; tone?: "brand"|"success"|"danger"|"warning" }) {
  const map: Record<string,string> = {
    brand:   "text-[var(--edufit-primary)] bg-blue-50",
    success: "text-green-700 bg-green-50",
    danger:  "text-red-700 bg-red-50",
    warning: "text-[var(--edufit-accent)] bg-orange-50",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${map[tone]}`}>
      {children}
    </span>
  );
}
