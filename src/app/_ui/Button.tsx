import * as React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline";
  full?: boolean;
};

export default function Button({ variant="primary", full, className="", ...props }: Props) {
  const base = "inline-flex items-center justify-center rounded-md px-4 h-10 font-semibold transition disabled:opacity-50";
  const variants: Record<string,string> = {
    primary:   "text-white bg-[var(--edufit-accent)] hover:opacity-90",
    secondary: "text-white bg-[var(--edufit-primary)] hover:opacity-90",
    outline:   "text-[var(--edufit-primary)] border border-[var(--edufit-primary)] bg-transparent hover:bg-[color-mix(in_srgb,var(--edufit-primary)_6%,white)]",
  };
  return (
    <button {...props}
      className={`${base} ${variants[variant]} ${full ? "w-full" : ""} ${className}`} />
  );
}
