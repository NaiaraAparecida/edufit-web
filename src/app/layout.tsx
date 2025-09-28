import type { Metadata } from "next";
import "../app/globals.css";

export const metadata: Metadata = {
  title: "EduFit",
  description: "Plataforma EduFit (web)",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        {/* Navbar EduFit */}
        <div className="sticky top-0 z-50 border-b border-[var(--edufit-border)] bg-white">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
            <a href="." className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-md bg-[var(--edufit-primary)]" />
              <span className="font-bold text-[var(--edufit-primary)]">EduFit</span>
            </a>
            <nav className="flex items-center gap-4 text-sm">
              <a className="hover:text-[var(--edufit-primary)]" href="/videos">Vídeos</a>
              <a className="hover:text-[var(--edufit-primary)]" href="/challenges">Desafios</a>
              <a className="hover:text-[var(--edufit-primary)]" href="/reports">Relatórios</a>
              <a className="hover:text-[var(--edufit-primary)]" href="/chat">Chat</a>
              <a className="hover:text-[var(--edufit-primary)]" href="/profile">Perfil</a>
            </nav>
          </div>
        </div>

        <main className="mx-auto max-w-5xl px-4 py-6">{children}</main>
      </body>
    </html>
  );
}


