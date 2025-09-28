# EduFit (Web)
Aplicação **web** do EduFit construída com **Next.js (App Router)** + **APIs mock** + **Tailwind v4**.  
Entrega páginas de **Vídeos**, **Desafios**, **Chat**, **Relatórios** e **Perfil**, além de rotas **/api/** consumidas pelo mobile.

## ✨ Destaques
- Next.js 14+ (App Router)
- Tailwind CSS v4 (setup simples: `@import "tailwindcss"`)
- Rotas de API em `/api/*` (mock em memória)
- Design system leve nas cores do EduFit (azul/laranja)
- Pronto para deploy na **Vercel**
- Fácil de evoluir para **Supabase / Prisma + DB**

## 🔧 Stack
- **Web:** Next.js, React, Tailwind v4
- **APIs:** Next.js Route Handlers (`/src/app/api/**/route.ts`)
- **Gráficos (futuro opcional):** Recharts ou Chart.js
- **Auth real (futuro opcional):** Supabase Auth

## 📁 Estrutura

src/
app/
(páginas)/page.tsx
api/
login/route.ts
videos/route.ts
challenges/route.ts
messages/route.ts
reports/
summary/route.ts
progress/route.ts
me/route.ts
app/globals.css
app/_ui/ (Button, Card, Badge, PageTitle)


## ▶️ Rodando localmente
```bash
# 1) instale dependências
npm install

# 2) crie variáveis de ambiente
cp .env.local.example .env.local
# edite se necessário:
# NEXT_PUBLIC_BASE_URL=http://localhost:3000

# 3) dev
npm run dev

# 4) build (verificação final)
npm run build
npm start

.env.local
NEXT_PUBLIC_BASE_URL=http://localhost:3000


🧪 Rotas de API (mock)

POST /api/login → { token, user }
(Opcional GET informativo: “Use POST /api/login com { email }”)

GET /api/videos

GET/POST /api/challenges

GET/POST /api/messages?room=global

GET /api/reports/summary

GET /api/reports/progress?range=30d

GET/PUT /api/me

Observação: handlers usam estado em memória, reiniciam ao reiniciar o servidor.

🖼️ Next/Image (domínios remotos)

Se usar avatares externos, configure next.config.(js|ts):

// next.config.js
module.exports = {
  images: { domains: ["i.pravatar.cc"] },
};

🎨 Tailwind v4 (sem @apply/@theme)

src/app/globals.css:

@import "tailwindcss";
:root {
  --edufit-primary: #0A4C86;
  --edufit-accent:  #FF7A00;
  --edufit-border:  #E2E8F0;
  --edufit-text:    #0F172A;
}


postcss.config.js:

module.exports = { plugins: { '@tailwindcss/postcss': {} } };

🚀 Deploy (Vercel)

Push no GitHub

Importar no Vercel

Definir env (opcional): NEXT_PUBLIC_BASE_URL → deixar a própria URL do Vercel

Deploy

Após deploy, aponte o mobile para a URL pública do web.

🧩 Roadmap

 Persistência real (Supabase / Prisma + PostgreSQL)

 Gráfico de linha nos relatórios (Recharts)

 Autenticação real + e-mail/password

 Testes E2E (Playwright)

🆘 Troubleshooting

Tailwind v4 erro PostCSS → instale @tailwindcss/postcss e use o postcss.config.js acima

405 em /api/login no navegador → é POST; use curl/Postman (ou adicione GET informativo)

404 nas páginas → verifique caminho src/app/**/page.tsx e reinicie npm run dev