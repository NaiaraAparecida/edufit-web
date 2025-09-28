import Button from "./_ui/Button";
import Card from "./_ui/Card";

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Banner */}
      <header className="rounded-2xl border border-[var(--edufit-border)] p-6"
              style={{ background: "color-mix(in srgb, var(--edufit-primary) 8%, white)" }}>
        <h1 className="text-2xl font-bold text-[var(--edufit-primary)]">Bem-vinda ao EduFit (web)</h1>
        <p className="mt-1 text-[color-mix(in_srgb,var(--edufit-primary)_60%,#fff)]">
          Vídeos, desafios, chat e relatórios — tudo num só lugar.
        </p>
        <div className="mt-4 flex gap-3">
          <a href="/videos"><Button>Vídeos</Button></a>
          <a href="/challenges"><Button variant="secondary">Desafios</Button></a>
        </div>
      </header>

      {/* Atalhos */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <a href="/reports"><Card className="hover:bg-slate-50 transition">
          <p className="font-semibold">Relatórios</p>
          <p className="mt-1 text-sm text-[var(--edufit-muted)]">KPIs e progresso (30d)</p>
        </Card></a>
        <a href="/chat"><Card className="hover:bg-slate-50 transition">
          <p className="font-semibold">Chat</p>
          <p className="mt-1 text-sm text-[var(--edufit-muted)]">Converse no canal global</p>
        </Card></a>
        <a href="/profile"><Card className="hover:bg-slate-50 transition">
          <p className="font-semibold">Perfil</p>
          <p className="mt-1 text-sm text-[var(--edufit-muted)]">Atualize nome e avatar</p>
        </Card></a>
      </section>
    </div>
  );
}
