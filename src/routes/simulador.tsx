import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import {
  ArrowRight,
  Calculator,
  Info,
  Layers,
  Sprout,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { ExportBar } from "@/components/export-bar";
import { CooxupeSimulator } from "@/components/cooxupe-simulator";
import type { ExportPayload } from "@/lib/export";
import { FASES, brl, pct } from "@/lib/reforma";
import { CurrencyInput } from "@/components/currency-input";

export const Route = createFileRoute("/simulador")({
  head: () => ({
    meta: [
      { title: "Simuladores Avançados IBS/CBS & Agro | Nexo Tributário" },
      {
        name: "description",
        content:
          "Simulação completa de IBS e CBS: compare o modelo atual, a transição 2026-2033, mix de alíquotas e o motor fiscal agropecuário por NCM e cooperativas (LC 214/2025).",
      },
      { property: "og:title", content: "Simuladores Avançados da Reforma Tributária | Nexo Tributário" },
      {
        property: "og:description",
        content:
          "Cenário corporativo ano a ano e motor de classificação NCM agropecuária em um único portal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SimuladorPage,
});

function Row({
  label,
  children,
}: {
  label: string;
  value?: number;
  isCurrency?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      {children}
    </label>
  );
}

function NumberInput({
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
}: {
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}) {
  return (
    <span className="mt-1.5 flex items-center gap-2 rounded-xl bg-background/50 px-3 py-2.5 ring-1 ring-border focus-within:ring-primary/50">
      {prefix && <span className="text-sm font-semibold text-primary">{prefix}</span>}
      {prefix === "R$" ? (
        <CurrencyInput
          value={value}
          onChange={onChange}
          className="w-full bg-transparent text-sm font-semibold tracking-wide text-foreground outline-none placeholder:text-muted-foreground/50"
        />
      ) : (
        <input
          type="number"
          min={0}
          step={step}
          value={Number.isFinite(value) ? value : 0}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-transparent text-sm font-medium outline-none"
        />
      )}
      {suffix && <span className="text-xs text-muted-foreground">{suffix}</span>}
    </span>
  );
}

function SimuladorPage() {
  const [activeTab, setActiveTab] = useState<"corporativo" | "agro">("corporativo");

  // Ler parâmetro da URL se presente
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get("tab");
      if (tabParam === "agro" || params.get("sku")) {
        setActiveTab("agro");
      } else if (tabParam === "corporativo") {
        setActiveTab("corporativo");
      }
    }
  }, []);

  return (
    <div className="bg-aurora min-h-screen font-sans text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-16">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-border">
          <div>
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
              Central de Simulação & Inteligência
            </span>
            <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance">
              Simuladores Tributários Estratégicos
            </h1>
            <p className="mt-3 max-w-[64ch] text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
              Alterne entre a simulação corporativa ampla da transição 2026–2033 e o motor analítico
              agropecuário especializado por código NCM e regras cooperativas.
            </p>
          </div>

          {/* Abas Superiores */}
          <div className="flex rounded-2xl bg-card p-1.5 ring-1 ring-border shadow-glass">
            <button
              type="button"
              onClick={() => setActiveTab("corporativo")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "corporativo"
                  ? "bg-primary text-primary-foreground shadow-[0_0_16px_var(--color-glow)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Calculator className="size-4" />
              <span>Corporativo & Transição</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("agro")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                activeTab === "agro"
                  ? "bg-emerald-500 text-slate-950 font-bold shadow-[0_0_16px_rgba(52,211,153,0.4)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Sprout className="size-4" />
              <span>Agro & NCMs (Cooxupé)</span>
            </button>
          </div>
        </div>

        {/* Conteúdo Dinâmico */}
        <div className="mt-10">
          {activeTab === "corporativo" ? (
            <SimuladorCorporativo />
          ) : (
            <div className="animate-fade-in">
              <CooxupeSimulator />
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function SimuladorCorporativo() {
  const [receita, setReceita] = useState(1000000);
  const [insumos, setInsumos] = useState(450000);
  const [cargaAtual, setCargaAtual] = useState(23);
  const [cumulatividade, setCumulatividade] = useState(35);
  const [mixPadrao, setMixPadrao] = useState(70);
  const [mixReduzida, setMixReduzida] = useState(25);
  const [mixZero, setMixZero] = useState(5);
  const [anoFoco, setAnoFoco] = useState<string>("2027");

  const mixTotal = mixPadrao + mixReduzida + mixZero;

  const dados = useMemo(() => {
    const norm = mixTotal > 0 ? mixTotal : 100;
    const aliquotaMedia =
      (mixPadrao / norm) * 0.265 + (mixReduzida / norm) * 0.106 + (mixZero / norm) * 0;

    // Cenário atual
    const debitoAtual = receita * (cargaAtual / 100);
    const creditoAtual = insumos * (cargaAtual / 100) * (1 - cumulatividade / 100);
    const atual = Math.max(debitoAtual - creditoAtual, 0);

    // Modelo novo pleno
    const debitoNovo = receita * aliquotaMedia;
    const creditoNovo = insumos * aliquotaMedia;
    const novo = Math.max(debitoNovo - creditoNovo, 0);

    // Transição: mistura ponderada
    const fases = FASES.map((f) => {
      const valor = novo * f.novo + atual * f.antigo;
      return { ...f, valor };
    });

    return { aliquotaMedia, atual, novo, debitoAtual, creditoAtual, debitoNovo, creditoNovo, fases };
  }, [receita, insumos, cargaAtual, cumulatividade, mixPadrao, mixReduzida, mixZero, mixTotal]);

  const foco = dados.fases.find((f) => f.ano === anoFoco)!;
  const max = Math.max(dados.atual, dados.novo, ...dados.fases.map((f) => f.valor), 1);
  const delta = dados.novo - dados.atual;

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr] animate-fade-in">
      {/* PAINEL DE ENTRADA */}
      <div className="glass h-fit rounded-3xl p-7 shadow-glass">
        <h2 className="font-display text-xl font-semibold">Parâmetros da Operação</h2>
        <div className="mt-6 space-y-4">
          <Row label="Receita mensal" value={receita} isCurrency>
            <NumberInput value={receita} onChange={setReceita} prefix="R$" step={10000} />
          </Row>
          <Row label="Insumos e compras tributadas" value={insumos} isCurrency>
            <NumberInput value={insumos} onChange={setInsumos} prefix="R$" step={10000} />
          </Row>
          <Row label="Carga tributária efetiva hoje">
            <NumberInput value={cargaAtual} onChange={setCargaAtual} suffix="%" step={0.5} />
          </Row>
          <Row label="Parcela dos insumos sem crédito hoje">
            <NumberInput value={cumulatividade} onChange={setCumulatividade} suffix="%" />
          </Row>
        </div>

        <h3 className="mt-8 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
          Mix da receita por regime
        </h3>
        <div className="mt-4 space-y-4">
          <Row label="Alíquota padrão (26,5%)">
            <NumberInput value={mixPadrao} onChange={setMixPadrao} suffix="%" />
          </Row>
          <Row label="Alíquota reduzida em 60% (10,6%)">
            <NumberInput value={mixReduzida} onChange={setMixReduzida} suffix="%" />
          </Row>
          <Row label="Alíquota zero / cesta básica">
            <NumberInput value={mixZero} onChange={setMixZero} suffix="%" />
          </Row>
        </div>
        <p
          className={`mt-4 text-xs ${
            mixTotal === 100 ? "text-muted-foreground" : "text-destructive"
          }`}
        >
          Soma do mix: {mixTotal}% {mixTotal !== 100 && "(será normalizada para 100%)"}
        </p>
        <div className="mt-6 rounded-2xl bg-primary/[0.07] p-4 ring-1 ring-primary/20">
          <p className="text-xs text-muted-foreground">Alíquota média resultante</p>
          <p className="mt-1 font-display text-2xl font-semibold text-primary">
            {pct(dados.aliquotaMedia)}
          </p>
        </div>
      </div>

      {/* RESULTADOS */}
      <div className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { t: "Modelo atual", v: dados.atual, sub: "PIS/COFINS, IPI, ICMS e ISS" },
            { t: `Transição ${foco.ano}`, v: foco.valor, sub: foco.nota },
            { t: "Novo modelo (2033)", v: dados.novo, sub: "CBS + IBS com crédito integral" },
          ].map((c, i) => (
            <div
              key={c.t}
              className={`glass rounded-3xl p-6 shadow-glass ${
                i === 2 ? "ring-1 ring-primary/25" : ""
              }`}
            >
              <p className="text-[11px] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                {c.t}
              </p>
              <p
                className={`mt-3 font-display text-2xl font-semibold tracking-tight ${
                  i === 2 ? "text-primary" : ""
                }`}
              >
                {brl(c.v)}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="glass rounded-3xl p-7 shadow-glass">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-xl font-semibold">Carga mensal estimada por fase</h2>
            <div className="flex flex-wrap gap-2">
              {dados.fases.map((f) => (
                <button
                  key={f.ano}
                  type="button"
                  onClick={() => setAnoFoco(f.ano)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                    anoFoco === f.ano
                      ? "bg-primary text-primary-foreground"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {f.ano}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {[
              { label: "Hoje", valor: dados.atual, cor: "bg-muted-foreground/40" },
              ...dados.fases.map((f) => ({
                label: f.ano,
                valor: f.valor,
                cor: f.ano === anoFoco ? "bg-primary" : "bg-primary/45",
              })),
            ].map((b) => (
              <div key={b.label} className="flex items-center gap-4">
                <span className="w-12 shrink-0 text-xs font-semibold text-muted-foreground">
                  {b.label}
                </span>
                <div className="h-8 flex-1 overflow-hidden rounded-lg bg-background/50 ring-1 ring-border">
                  <div
                    className={`h-full rounded-lg ${b.cor} transition-all duration-500`}
                    style={{ width: `${Math.max((b.valor / max) * 100, 1.5)}%` }}
                  />
                </div>
                <span className="w-28 shrink-0 text-right text-sm font-semibold">
                  {brl(b.valor)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-background/40 p-5 ring-1 ring-border">
              <p className="text-xs text-muted-foreground">Composição no modelo atual</p>
              <p className="mt-2 text-sm">Débito {brl(dados.debitoAtual)}</p>
              <p className="text-sm text-muted-foreground">Crédito {brl(dados.creditoAtual)}</p>
            </div>
            <div className="rounded-2xl bg-primary/[0.07] p-5 ring-1 ring-primary/20">
              <p className="text-xs text-muted-foreground">Composição no novo modelo</p>
              <p className="mt-2 text-sm">Débito {brl(dados.debitoNovo)}</p>
              <p className="text-sm text-muted-foreground">Crédito {brl(dados.creditoNovo)}</p>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3 rounded-2xl bg-background/40 p-5 ring-1 ring-border">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
              {delta <= 0 ? <TrendingDown className="size-4" /> : <TrendingUp className="size-4" />}
            </span>
            <div>
              <p className="text-sm font-semibold">
                {delta <= 0 ? "Redução" : "Aumento"} estimado de {brl(Math.abs(delta))} por mês no
                modelo pleno
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Equivalente a {brl(Math.abs(delta) * 12)} ao ano. O resultado muda conforme o
                aproveitamento efetivo de créditos e a alíquota de referência final definida em lei.
              </p>
            </div>
          </div>

          {/* BARRA DE EXPORTAÇÃO */}
          <ExportBar
            payload={{
              nome: "nexo_tributario_simulador_corporativo",
              titulo: "Nexo Tributário | Simulador Avançado IBS/CBS: Cenários e Transição",
              linhas: [
                { secao: "Premissas da Operação", campo: "Receita mensal", valor: brl(receita) },
                {
                  secao: "Premissas da Operação",
                  campo: "Insumos e compras tributadas",
                  valor: brl(insumos),
                },
                {
                  secao: "Premissas da Operação",
                  campo: "Carga tributária efetiva hoje",
                  valor: `${cargaAtual}%`,
                },
                {
                  secao: "Premissas da Operação",
                  campo: "Parcela dos insumos sem crédito hoje",
                  valor: `${cumulatividade}%`,
                },
                {
                  secao: "Premissas da Operação",
                  campo: "Mix da receita - Alíquota padrão (26,5%)",
                  valor: `${mixPadrao}%`,
                },
                {
                  secao: "Premissas da Operação",
                  campo: "Mix da receita - Alíquota reduzida (10,6%)",
                  valor: `${mixReduzida}%`,
                },
                {
                  secao: "Premissas da Operação",
                  campo: "Mix da receita - Alíquota zero",
                  valor: `${mixZero}%`,
                },
                {
                  secao: "Premissas da Operação",
                  campo: "Alíquota média ponderada calculada",
                  valor: pct(dados.aliquotaMedia),
                },
                {
                  secao: "Resultados Gerais",
                  campo: "Carga mensal no modelo atual",
                  valor: brl(dados.atual),
                },
                {
                  secao: "Resultados Gerais",
                  campo: "Débito no modelo atual",
                  valor: brl(dados.debitoAtual),
                },
                {
                  secao: "Resultados Gerais",
                  campo: "Crédito no modelo atual",
                  valor: brl(dados.creditoAtual),
                },
                {
                  secao: "Resultados Gerais",
                  campo: `Transição ${foco.ano} (${foco.nota})`,
                  valor: brl(foco.valor),
                },
                {
                  secao: "Resultados Gerais",
                  campo: "Carga mensal no modelo pleno (2033)",
                  valor: brl(dados.novo),
                },
                {
                  secao: "Resultados Gerais",
                  campo: "Débito no modelo pleno (2033)",
                  valor: brl(dados.debitoNovo),
                },
                {
                  secao: "Resultados Gerais",
                  campo: "Crédito no modelo pleno (2033)",
                  valor: brl(dados.creditoNovo),
                },
                {
                  secao: "Resultados Gerais",
                  campo:
                    delta <= 0
                      ? "Redução mensal estimada (2033)"
                      : "Aumento mensal estimado (2033)",
                  valor: brl(Math.abs(delta)),
                },
                {
                  secao: "Resultados Gerais",
                  campo:
                    delta <= 0
                      ? "Redução anual estimada (2033)"
                      : "Aumento anual estimado (2033)",
                  valor: brl(Math.abs(delta) * 12),
                },
                ...dados.fases.map((f) => ({
                  secao: "Cronograma da Transição (2026-2033)",
                  campo: `Ano ${f.ano}: ${f.nota}`,
                  valor: `${brl(f.valor)} (Novo: ${Math.round(f.novo * 100)}% / Antigo: ${Math.round(f.antigo * 100)}%)`,
                })),
              ],
            }}
            hint="Exporte todas as premissas e a projeção completa ano a ano (2026 a 2033) para PDF, Excel ou CSV."
          />
        </div>

        <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-3xl p-6 shadow-glass">
          <p className="flex max-w-[52ch] gap-2 text-xs leading-relaxed text-muted-foreground">
            <Info className="mt-0.5 size-3.5 shrink-0 text-primary" />
            Projeção educativa com parâmetros simplificados. Para decisões e obrigações acessórias,
            consulte a calculadora oficial da Receita Federal e as normas da LC 214/2025.
          </p>
          <div className="flex gap-3">
            <Link
              to="/radar"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_24px_var(--color-glow)]"
            >
              Ver Radar de mudanças
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
