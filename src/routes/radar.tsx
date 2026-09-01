import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  ClipboardList,
  History,
  Radar as RadarIcon,
} from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import {
  COLUNAS_RADAR,
  ULTIMA_ATUALIZACAO_RADAR,
  type ItemRadar,
} from "@/data/radar-data";

export const Route = createFileRoute("/radar")({
  head: () => ({
    meta: [
      { title: "Radar de Mudanças da Reforma Tributária | Nexo Tributário" },
      {
        name: "description",
        content:
          "Acompanhe o que já mudou com a Reforma Tributária (LC 214/2025), os próximos marcos, o que ainda depende de regulamentação e o checklist prático para empresas.",
      },
      { property: "og:title", content: "Radar de Mudanças | Nexo Tributário" },
      {
        property: "og:description",
        content:
          "Painel único com o que já mudou, prazos de vigência, pendências de regulamentação e checklist interativo para adaptação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Radar,
});

const colunasComIcones = COLUNAS_RADAR.map((c) => {
  let icon = History;
  if (c.id === "breve") icon = CalendarClock;
  if (c.id === "pendente") icon = AlertTriangle;
  if (c.id === "fazer") icon = ClipboardList;
  return { ...c, icon };
});

function Radar() {
  const [filtroPublico, setFiltroPublico] = useState<string>("Todos os públicos");
  const [checklistFeitos, setChecklistFeitos] = useState<string[]>([]);

  const toggleChecklist = (id: string) => {
    setChecklistFeitos((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const visivelColuna = (item: ItemRadar) => {
    if (filtroPublico === "Todos os públicos") return true;
    return item.publico === filtroPublico || item.publico === "Todos";
  };

  return (
    <div className="bg-aurora min-h-screen font-sans text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 pt-12 sm:pt-16 pb-16">
        {/* CABEÇALHO */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
              <RadarIcon className="size-3.5 text-primary" />
              Ciclo 2026 · EC 132/2023 & Leis Complementares
            </span>
            <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-primary">
              <span className="size-1.5 rounded-full bg-primary animate-ping" />
              Atualizado em {ULTIMA_ATUALIZACAO_RADAR}
            </span>
          </div>

          <h1 className="mt-6 max-w-[26ch] font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance">
            Radar de Mudanças.
          </h1>
          <p className="mt-5 max-w-[62ch] text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
            Acompanhe o que já está em vigor, os prazos que se aproximam, o que ainda depende de
            normas complementares e o checklist para blindar a sua empresa.
          </p>
        </div>

        {/* FILTROS RÁPIDOS DE PÚBLICO */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {[
            "Todos os públicos",
            "Empresas",
            "MEI e Simples",
            "Consumidor",
            "Agronegócio",
          ].map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setFiltroPublico(p)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                filtroPublico === p
                  ? "bg-primary text-primary-foreground shadow-[0_0_20px_var(--color-glow)]"
                  : "glass text-muted-foreground hover:bg-glass-strong hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* GRADE DAS 4 COLUNAS DO RADAR */}
        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {colunasComIcones.map((col) => {
            const itens = col.itens.filter(visivelColuna);
            return (
              <section key={col.id} className="glass flex flex-col rounded-3xl p-6 shadow-glass">
                <div className="flex items-start gap-3">
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 ring-1 ring-primary/25 ${col.tom}`}
                  >
                    <col.icon className="size-4.5" />
                  </span>
                  <div>
                    <h2 className="font-display text-lg leading-tight font-semibold">{col.titulo}</h2>
                    <p className="mt-0.5 text-xs text-muted-foreground">{col.subtitulo}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {itens.length === 0 && (
                    <p className="rounded-2xl bg-background/40 px-4 py-6 text-center text-xs text-muted-foreground ring-1 ring-border">
                      Nenhum item nesta coluna para o filtro selecionado.
                    </p>
                  )}
                  {itens.map((i) => {
                    const isChecklist = col.id === "fazer";
                    const done = checklistFeitos.includes(i.id);

                    return (
                      <article
                        key={i.id}
                        className={`group relative rounded-2xl bg-background/45 p-4.5 ring-1 transition-all ${
                          done
                            ? "ring-primary/40 opacity-60"
                            : "ring-border hover:ring-primary/25"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3
                            className={`text-sm font-semibold leading-snug ${
                              done ? "line-through text-muted-foreground" : ""
                            }`}
                          >
                            {i.titulo}
                          </h3>

                          {isChecklist ? (
                            <button
                              type="button"
                              onClick={() => toggleChecklist(i.id)}
                              aria-label={done ? "Marcar como pendente" : "Marcar como concluído"}
                              className={`grid size-6 shrink-0 place-items-center rounded-full ring-1 transition-colors ${
                                done
                                  ? "bg-primary text-primary-foreground ring-primary"
                                  : "text-muted-foreground ring-border hover:text-primary"
                              }`}
                            >
                              <CheckCircle2 className="size-3.5" />
                            </button>
                          ) : (
                            <span className="shrink-0 rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold text-primary ring-1 ring-primary/20">
                              {i.data}
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{i.detalhe}</p>

                        <div className="mt-3 flex flex-wrap items-center gap-1.5">
                          {isChecklist && (
                            <span className="rounded-full bg-primary/12 px-2 py-0.5 text-[10px] font-semibold text-primary">
                              {i.data}
                            </span>
                          )}
                          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                            {i.publico}
                          </span>
                          {i.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full bg-glass px-2 py-0.5 text-[10px] text-muted-foreground ring-1 ring-border/60"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* BARRA INFORMATIVA INFERIOR */}
        <div className="glass mt-8 flex flex-wrap items-center justify-between gap-5 rounded-3xl p-7 shadow-glass ring-1 ring-primary/20">
          <p className="max-w-[54ch] text-sm leading-relaxed text-muted-foreground">
            A Reforma Tributária tem calendário de transição de <strong>2026 a 2033</strong>.
            Use os simuladores para projetar o impacto no seu negócio e as calculadoras para
            entender cada mecânica do novo modelo.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/simulador"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_24px_var(--color-glow)]"
            >
              Abrir simulador avançado
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/ferramentas"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:bg-glass-strong"
            >
              Calculadoras
            </Link>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
