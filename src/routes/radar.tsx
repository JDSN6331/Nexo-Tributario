import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Bell,
  BellRing,
  Bookmark,
  CalendarClock,
  CheckCheck,
  CheckCircle2,
  ClipboardList,
  History,
  Info,
  Radar as RadarIcon,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import {
  COLUNAS_RADAR,
  HISTORICO_ATUALIZACOES,
  TODAS_CATEGORIAS,
  TODOS_PUBLICOS,
  ULTIMA_ATUALIZACAO_RADAR,
  VERSAO_BASE_NORMATIVA,
  type CategoriaTipo,
  type ItemRadar,
  type PublicoTipo,
} from "@/data/radar-data";

export const Route = createFileRoute("/radar")({
  head: () => ({
    meta: [
      { title: "Radar de Mudanças e Central de Alertas | Nexo Tributário" },
      {
        name: "description",
        content:
          "Assine alertas personalizados por perfil e categoria, acompanhe o que mudou na LC 214/2025, prazos próximos, pendências regulatórias e o checklist prático para empresas.",
      },
      { property: "og:title", content: "Radar de Mudanças e Alertas | Nexo Tributário" },
      {
        property: "og:description",
        content:
          "Painel único com alertas personalizados por perfil, prazos de vigência, pendências de regulamentação e checklist interativo com persistência.",
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

const todosItens: ItemRadar[] = COLUNAS_RADAR.flatMap((c) => c.itens);

const STORAGE_KEY = "clareza_fiscal_radar_config_v1";

type RadarConfig = {
  perfisAssinados: PublicoTipo[];
  categoriasAssinadas: CategoriaTipo[];
  itensLidos: string[];
  itensSalvos: string[];
  checklistFeitos: string[];
};

const defaultConfig: RadarConfig = {
  perfisAssinados: ["Empresas", "MEI e Simples"],
  categoriasAssinadas: [
    "ERP & Sistemas",
    "Nota Fiscal & Emissão",
    "Preços & Margens",
    "Crédito & Caixa",
    "Regulamentação & Leis",
  ],
  itensLidos: [],
  itensSalvos: [],
  checklistFeitos: [],
};

function Radar() {
  const [filtroPublico, setFiltroPublico] = useState<string>("Todos os públicos");
  const [config, setConfig] = useState<RadarConfig>(defaultConfig);
  const [painelAberto, setPainelAberto] = useState(false);
  const [abaPainel, setAbaPainel] = useState<
    "novidades" | "prazos" | "pendencias" | "checklist" | "changelog" | "preferencias"
  >("novidades");

  // Carregar dados salvos do localStorage
  useEffect(() => {
    try {
      const salvo = localStorage.getItem(STORAGE_KEY);
      if (salvo) {
        const parsed = JSON.parse(salvo);
        setConfig({
          perfisAssinados: Array.isArray(parsed.perfisAssinados)
            ? parsed.perfisAssinados
            : defaultConfig.perfisAssinados,
          categoriasAssinadas: Array.isArray(parsed.categoriasAssinadas)
            ? parsed.categoriasAssinadas
            : defaultConfig.categoriasAssinadas,
          itensLidos: Array.isArray(parsed.itensLidos) ? parsed.itensLidos : [],
          itensSalvos: Array.isArray(parsed.itensSalvos) ? parsed.itensSalvos : [],
          checklistFeitos: Array.isArray(parsed.checklistFeitos) ? parsed.checklistFeitos : [],
        });
      }
    } catch {
      // fallback silencioso
    }
  }, []);

  // Salvar alterações no localStorage
  const salvarConfig = (novaConfig: RadarConfig) => {
    setConfig(novaConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novaConfig));
    } catch {
      // fallback
    }
  };

  const togglePerfilAssinatura = (perfil: PublicoTipo) => {
    const existe = config.perfisAssinados.includes(perfil);
    const perfisAssinados = existe
      ? config.perfisAssinados.filter((p) => p !== perfil)
      : [...config.perfisAssinados, perfil];
    salvarConfig({ ...config, perfisAssinados });
  };

  const toggleCategoriaAssinatura = (cat: CategoriaTipo) => {
    const existe = config.categoriasAssinadas.includes(cat);
    const categoriasAssinadas = existe
      ? config.categoriasAssinadas.filter((c) => c !== cat)
      : [...config.categoriasAssinadas, cat];
    salvarConfig({ ...config, categoriasAssinadas });
  };

  const toggleChecklist = (id: string) => {
    const checklistFeitos = config.checklistFeitos.includes(id)
      ? config.checklistFeitos.filter((x) => x !== id)
      : [...config.checklistFeitos, id];
    salvarConfig({ ...config, checklistFeitos });
  };

  const toggleSalvarItem = (id: string) => {
    const itensSalvos = config.itensSalvos.includes(id)
      ? config.itensSalvos.filter((x) => x !== id)
      : [...config.itensSalvos, id];
    salvarConfig({ ...config, itensSalvos });
  };

  const toggleLidoItem = (id: string) => {
    const itensLidos = config.itensLidos.includes(id)
      ? config.itensLidos.filter((x) => x !== id)
      : [...config.itensLidos, id];
    salvarConfig({ ...config, itensLidos });
  };

  const marcarTodosComoLidos = () => {
    const todosIds = todosItens.map((i) => i.id);
    salvarConfig({ ...config, itensLidos: todosIds });
  };

  // Avaliação de relevância do alerta com base nas assinaturas do usuário
  const isRelevante = (item: ItemRadar) => {
    const matchPerfil =
      item.publico === "Todos" ||
      config.perfisAssinados.includes("Todos") ||
      config.perfisAssinados.includes(item.publico);
    const matchCategoria = config.categoriasAssinadas.includes(item.categoria);
    return matchPerfil && matchCategoria;
  };

  const visivelColuna = (item: ItemRadar) => {
    if (filtroPublico === "Todos os públicos") return true;
    return item.publico === filtroPublico || item.publico === "Todos";
  };

  // Itens para o painel de alertas
  const alertasRelevantes = useMemo(
    () => todosItens.filter(isRelevante),
    [config.perfisAssinados, config.categoriasAssinadas],
  );

  const alertasNaoLidos = useMemo(
    () => alertasRelevantes.filter((i) => !config.itensLidos.includes(i.id)),
    [alertasRelevantes, config.itensLidos],
  );

  const prazosProximos = useMemo(
    () => todosItens.filter((i) => i.prazoAno && i.prazoAno <= 2027),
    [],
  );

  const pendenciasRegulatorias = useMemo(
    () => COLUNAS_RADAR.find((c) => c.id === "pendente")?.itens ?? [],
    [],
  );

  const itensChecklist = useMemo(
    () => COLUNAS_RADAR.find((c) => c.id === "fazer")?.itens ?? [],
    [],
  );

  const progressoChecklist = itensChecklist.length
    ? Math.round((config.checklistFeitos.length / itensChecklist.length) * 100)
    : 0;

  return (
    <div className="bg-aurora min-h-screen font-sans text-foreground">
      <SiteNav />

      <main className="mx-auto max-w-7xl px-6 pt-16 pb-16">
        {/* CABEÇALHO */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
                <RadarIcon className="size-3.5 text-primary" />
                Ciclo 2026 · {VERSAO_BASE_NORMATIVA}
              </span>
              <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold text-primary">
                <span className="size-1.5 rounded-full bg-primary animate-ping" />
                Revisão técnica: {ULTIMA_ATUALIZACAO_RADAR}
              </span>
            </div>

            <h1 className="mt-6 max-w-[26ch] font-display text-4xl font-semibold tracking-tight text-balance md:text-6xl">
              Radar de Mudanças.
            </h1>
            <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted-foreground text-pretty">
              Acompanhe o que já está em vigor, os prazos que se aproximam, o que ainda depende de
              normas complementares e o checklist para blindar a sua empresa.
            </p>
          </div>

          {/* BOTÃO MEUS ALERTAS */}
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <button
              type="button"
              onClick={() => setPainelAberto(true)}
              className="relative inline-flex items-center gap-2.5 rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-glass transition-all hover:shadow-[0_0_28px_var(--color-glow)]"
            >
              <BellRing className="size-4 animate-pulse" />
              <span>Meus Alertas</span>
              {alertasNaoLidos.length > 0 && (
                <span className="grid size-5 place-items-center rounded-full bg-background text-[11px] font-bold text-primary">
                  {alertasNaoLidos.length}
                </span>
              )}
            </button>
            <p className="text-xs text-muted-foreground">
              {config.perfisAssinados.length} perfil(is) e {config.categoriasAssinadas.length} tema(s)
              assinados
            </p>
          </div>
        </div>

        {/* FILTROS RÁPIDOS DE PÚBLICO */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
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

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setAbaPainel("changelog");
                setPainelAberto(true);
              }}
              className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <History className="size-3.5 text-primary" />
              Histórico de revisões
            </button>
            <button
              type="button"
              onClick={() => {
                setAbaPainel("preferencias");
                setPainelAberto(true);
              }}
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <SlidersHorizontal className="size-3.5 text-primary" />
              Configurar alertas
            </button>
          </div>
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
                    const done = config.checklistFeitos.includes(i.id);
                    const lido = config.itensLidos.includes(i.id);
                    const salvo = config.itensSalvos.includes(i.id);
                    const match = isRelevante(i);

                    return (
                      <article
                        key={i.id}
                        className={`group relative rounded-2xl bg-background/45 p-4.5 ring-1 transition-all ${
                          done
                            ? "ring-primary/40 opacity-60"
                            : match
                              ? "ring-primary/30 shadow-[0_0_16px_rgba(var(--color-glow-rgb),0.08)] hover:ring-primary/50"
                              : "ring-border hover:ring-primary/25"
                        }`}
                      >
                        {/* BADGE DE RELEVÂNCIA DO ALERTA */}
                        {match && !done && (
                          <div className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold text-primary">
                            <Sparkles className="size-3" />
                            Alerta relevante para o seu perfil
                          </div>
                        )}

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

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex flex-wrap items-center gap-1.5">
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

                          {/* AÇÕES RÁPIDAS NO CARD */}
                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100">
                            <button
                              type="button"
                              title={salvo ? "Remover dos salvos" : "Salvar alerta"}
                              onClick={() => toggleSalvarItem(i.id)}
                              className={`grid size-6 place-items-center rounded-lg ring-1 transition-colors ${
                                salvo
                                  ? "bg-primary/20 text-primary ring-primary/40"
                                  : "text-muted-foreground/60 ring-border/50 hover:text-foreground"
                              }`}
                            >
                              <Bookmark className="size-3" />
                            </button>
                            {!isChecklist && (
                              <button
                                type="button"
                                title={lido ? "Marcar como não lido" : "Marcar como lido"}
                                onClick={() => toggleLidoItem(i.id)}
                                className={`grid size-6 place-items-center rounded-lg ring-1 transition-colors ${
                                  lido
                                    ? "bg-primary/20 text-primary ring-primary/40"
                                    : "text-muted-foreground/60 ring-border/50 hover:text-foreground"
                                }`}
                              >
                                <CheckCheck className="size-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {/* BARRA INFORMATIVA E CHECKLIST SUMMARY */}
        <div className="glass mt-8 flex flex-wrap items-center justify-between gap-5 rounded-3xl p-7 shadow-glass ring-1 ring-primary/20">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <p className="font-display text-base font-semibold">
                Progresso do Checklist: {config.checklistFeitos.length} de {itensChecklist.length} ações
                concluídas ({progressoChecklist}%)
              </p>
            </div>
            <div className="h-2 w-64 overflow-hidden rounded-full bg-background/50 ring-1 ring-border">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${progressoChecklist}%` }}
              />
            </div>
            <p className="max-w-[54ch] text-xs leading-relaxed text-muted-foreground">
              Suas preferências e marcações ficam salvas no navegador. Para simular valores reais,
              utilize o simulador avançado ou as calculadoras simplificadas.
            </p>
          </div>
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

      {/* PAINEL MODAL / GAVETA "MEUS ALERTAS" */}
      {painelAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-background/60 animate-fade-in">
          <div className="glass-strong relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl p-6 shadow-2xl ring-1 ring-primary/30 md:p-8">
            {/* TOPO DO PAINEL */}
            <div className="flex items-start justify-between gap-4 border-b border-border/80 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
                    <Bell className="size-4" />
                  </span>
                  <h2 className="font-display text-2xl font-semibold tracking-tight">Meus Alertas</h2>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Central personalizada de monitoramento normativo e prazos da Reforma Tributária.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPainelAberto(false)}
                className="glass grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-glass-strong hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* ABAS DO PAINEL */}
            <div className="mt-4 flex flex-wrap gap-2 border-b border-border/60 pb-3">
              {[
                { id: "novidades", label: `Novidades (${alertasNaoLidos.length})` },
                { id: "prazos", label: `Prazos Próximos (${prazosProximos.length})` },
                { id: "pendencias", label: `Pendências (${pendenciasRegulatorias.length})` },
                { id: "checklist", label: `Minhas Ações (${config.checklistFeitos.length}/${itensChecklist.length})` },
                { id: "changelog", label: "Histórico de Revisões" },
                { id: "preferencias", label: "Preferências" },
              ].map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAbaPainel(a.id as typeof abaPainel)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    abaPainel === a.id
                      ? "bg-primary text-primary-foreground shadow-[0_0_16px_var(--color-glow)]"
                      : "glass text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>

            {/* CONTEÚDO SCROLLÁVEL DO PAINEL */}
            <div className="mt-5 flex-1 space-y-4 overflow-y-auto pr-1">
              {/* ABA 1: NOVIDADES & RELEVANTES */}
              {abaPainel === "novidades" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Alertas filtrados pelos seus perfis e categorias de interesse.
                    </p>
                    {alertasNaoLidos.length > 0 && (
                      <button
                        type="button"
                        onClick={marcarTodosComoLidos}
                        className="text-xs font-semibold text-primary hover:underline"
                      >
                        Marcar todos como lidos
                      </button>
                    )}
                  </div>

                  {alertasRelevantes.length === 0 ? (
                    <div className="rounded-2xl bg-background/40 p-8 text-center ring-1 ring-border">
                      <p className="text-sm font-semibold">Nenhum alerta para as preferências atuais</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Clique na aba "Preferências" para assinar novos perfis ou temas.
                      </p>
                    </div>
                  ) : (
                    alertasRelevantes.map((item) => {
                      const lido = config.itensLidos.includes(item.id);
                      return (
                        <div
                          key={item.id}
                          className={`rounded-2xl bg-background/50 p-4 ring-1 transition-all ${
                            lido ? "ring-border opacity-70" : "ring-primary/40 shadow-sm"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                {!lido && (
                                  <span className="size-2 rounded-full bg-primary animate-ping" />
                                )}
                                <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                  {item.data}
                                </span>
                                <span className="rounded-full bg-glass px-2 py-0.5 text-[10px] text-muted-foreground ring-1 ring-border/50">
                                  {item.categoria}
                                </span>
                              </div>
                              <h4 className="text-sm font-semibold">{item.titulo}</h4>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleLidoItem(item.id)}
                              className="text-xs text-muted-foreground hover:text-primary"
                            >
                              {lido ? "Não lido" : "Lido"}
                            </button>
                          </div>
                          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.detalhe}</p>
                        </div>
                      );
                    })
                  )}
                </div>
              )}

              {/* ABA 2: PRAZOS PRÓXIMOS */}
              {abaPainel === "prazos" && (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Marcos obrigatórios com vigência prevista entre 2026 e 2027.
                  </p>
                  {prazosProximos.map((item) => (
                    <div key={item.id} className="rounded-2xl bg-background/40 p-4 ring-1 ring-border">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                          {item.data}
                        </span>
                        <span className="text-[11px] text-muted-foreground font-medium">
                          Público: {item.publico}
                        </span>
                      </div>
                      <h4 className="mt-2 text-sm font-semibold">{item.titulo}</h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.detalhe}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* ABA 3: PENDÊNCIAS REGULATÓRIAS */}
              {abaPainel === "pendencias" && (
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Pontos críticos que ainda dependem de leis complementares e resoluções do Comitê Gestor.
                  </p>
                  {pendenciasRegulatorias.map((item) => (
                    <div key={item.id} className="rounded-2xl bg-destructive/10 p-4 ring-1 ring-destructive/25">
                      <div className="flex items-center justify-between gap-2">
                        <span className="flex items-center gap-1 text-xs font-semibold text-destructive">
                          <AlertTriangle className="size-3.5" />
                          Aguardando definição
                        </span>
                        <span className="rounded-full bg-background/50 px-2 py-0.5 text-[10px] text-muted-foreground">
                          {item.categoria}
                        </span>
                      </div>
                      <h4 className="mt-2 text-sm font-semibold">{item.titulo}</h4>
                      <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.detalhe}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* ABA 4: CHECKLIST */}
              {abaPainel === "checklist" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Ações imediatas para preparar sistemas, cadastros e contratos.
                    </p>
                    <button
                      type="button"
                      onClick={() => salvarConfig({ ...config, checklistFeitos: [] })}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                    >
                      <RotateCcw className="size-3" />
                      Limpar marcações
                    </button>
                  </div>
                  {itensChecklist.map((item) => {
                    const feito = config.checklistFeitos.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className={`flex cursor-pointer items-start gap-3 rounded-2xl p-3.5 ring-1 transition-all ${
                          feito
                            ? "bg-primary/10 ring-primary/30 opacity-70"
                            : "bg-background/40 ring-border hover:ring-primary/20"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={feito}
                          onChange={() => toggleChecklist(item.id)}
                          className="mt-1 size-4 accent-primary"
                        />
                        <div className="flex-1">
                          <p className={`text-sm font-semibold ${feito ? "line-through" : ""}`}>
                            {item.titulo}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                            {item.detalhe}
                          </p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}

              {/* ABA 5: CHANGELOG / HISTÓRICO DE REVISÕES */}
              {abaPainel === "changelog" && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Registro público de atualizações normativas e melhorias da plataforma.
                    </p>
                    <span className="rounded-full bg-primary/15 px-2.5 py-0.5 text-[10px] font-semibold text-primary">
                      Revisão ativa: {ULTIMA_ATUALIZACAO_RADAR}
                    </span>
                  </div>

                  {HISTORICO_ATUALIZACOES.map((item) => (
                    <div key={item.data + item.versao} className="rounded-2xl bg-background/40 p-4 ring-1 ring-border">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-bold text-primary">
                            {item.versao}
                          </span>
                          <span className="text-xs font-semibold">{item.titulo}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{item.data}</span>
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.descricao}</p>
                      <p className="mt-2 text-[10px] font-medium text-primary/80">
                        Base legal: {item.fonte}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* ABA 6: PREFERÊNCIAS DE ASSINATURA */}
              {abaPainel === "preferencias" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-display text-sm font-semibold">1. Perfis de interesse</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Selecione quais perfis correspondem à sua atuação para filtrar novidades.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {TODOS_PUBLICOS.map((pub) => {
                        const ativo = config.perfisAssinados.includes(pub);
                        return (
                          <button
                            key={pub}
                            type="button"
                            onClick={() => togglePerfilAssinatura(pub)}
                            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                              ativo
                                ? "bg-primary text-primary-foreground shadow-[0_0_12px_var(--color-glow)]"
                                : "glass text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {pub} {ativo && "✓"}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-sm font-semibold">2. Categorias e temas</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Escolha as áreas operacionais que deseja monitorar no seu feed.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {TODAS_CATEGORIAS.map((cat) => {
                        const ativo = config.categoriasAssinadas.includes(cat);
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => toggleCategoriaAssinatura(cat)}
                            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                              ativo
                                ? "bg-primary text-primary-foreground shadow-[0_0_12px_var(--color-glow)]"
                                : "glass text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {cat} {ativo && "✓"}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-primary/[0.07] p-4 ring-1 ring-primary/20">
                    <p className="flex items-center gap-2 text-xs font-medium text-primary">
                      <Info className="size-4" />
                      Persistência automática no navegador
                    </p>
                    <p className="mt-1 text-[11px] text-muted-foreground leading-relaxed">
                      Suas configurações ficam gravadas neste dispositivo e serão lembradas nas suas
                      próximas visitas sem necessidade de cadastro ou login.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* RODAPÉ DO PAINEL */}
            <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-4">
              <p className="text-xs text-muted-foreground">
                {alertasRelevantes.length} alertas ativos para suas preferências
              </p>
              <button
                type="button"
                onClick={() => setPainelAberto(false)}
                className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground transition-all hover:shadow-[0_0_16px_var(--color-glow)]"
              >
                Concluir
              </button>
            </div>
          </div>
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
