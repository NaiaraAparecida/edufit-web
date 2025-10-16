import type { Metadata } from 'next';
import './globals.css';

import { AuthProvider } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'EduFit',
  description: 'Plataforma EduFit (web)',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {/* Skip link: aparece quando recebe foco via teclado */}
        <a
          href="#main"
          className="
            fixed left-2 top-2 z-[9999]
            -translate-y-20 rounded bg-black px-3 py-2 text-white
            focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          "
        >
          Pular para o conteúdo principal
        </a>

        <AuthProvider>
          <Navbar />
          <main
            id="main"
            role="main"
            className="mx-auto max-w-5xl px-4 py-6"
          >
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}



