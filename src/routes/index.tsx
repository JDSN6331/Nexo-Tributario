import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import {
  ArrowRight,
  Sparkles,
  Smartphone,
  Share2,
  MoreVertical,
  Calculator,
  ExternalLink,
  Newspaper,
  TrendingUp,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexo Tributário | Reforma Tributária & Inteligência Fiscal" },
      {
        name: "description",
        content:
          "Cinco impostos viram dois. Entenda a Reforma Tributária (LC 214/2025), o cronograma de transição até 2033 e simule o impacto para empresas, cooperativas e consumidores.",
      },
      {
        property: "og:title",
        content: "Nexo Tributário | Reforma Tributária & Inteligência Fiscal",
      },
      {
        property: "og:description",
        content:
          "Um guia visual e neutro sobre a Reforma Tributária brasileira: antes e depois, transição ano a ano e impactos práticos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const antigos = [
  { nome: "PIS", tipo: "federal" },
  { nome: "COFINS", tipo: "federal" },
  { nome: "IPI", tipo: "federal" },
  { nome: "ICMS", tipo: "estadual" },
  { nome: "ISS", tipo: "municipal" },
];

const novos = [
  { nome: "CBS", tipo: "federal" },
  { nome: "IBS", tipo: "estadual + municipal" },
];

const timeline = [
  { ano: "2026", texto: "CBS e IBS entram em fase de testes com alíquota simbólica. Nada muda no bolso ainda." },
  { ano: "2027", texto: "CBS substitui PIS e COFINS de vez. IPI é zerado para a maioria dos produtos." },
  { ano: "2029", texto: "Começa a redução gradual do ICMS e do ISS, enquanto o IBS cresce proporcionalmente." },
  { ano: "2033", texto: "Transição completa. Cinco tributos antigos deixam de existir, restando apenas CBS e IBS." },
];

const perfis = [
  {
    iconClass: "fi fi-rr-shopping-cart",
    titulo: "Você, consumidor",
    texto:
      "O imposto sai de dentro do preço e aparece destacado na nota. Produtos da cesta básica terão alíquota zero.",
    exemplo: "Seu café da manhã passa a mostrar exatamente quanto é imposto.",
  },
  {
    iconClass: "fi fi-rr-shop",
    titulo: "O empresário",
    texto:
      "Fim do imposto em cascata: o que foi pago na compra vira crédito na venda. Vender para outro estado deixa de ser um labirinto.",
    exemplo: "Uma loja online vende para todo o país com uma regra só.",
  },
  {
    iconClass: "fi fi-rr-briefcase",
    titulo: "O MEI",
    texto:
      "Quem fatura pouco mantém regras simplificadas e alíquota reduzida, com caminho claro para crescer sem sustos.",
    exemplo: "A guia mensal continua simples e a nota fiscal, padronizada.",
  },
];

const mitos = [
  {
    mito: "“Vão criar um imposto novo.”",
    fato: "É a unificação de tributos que já existem. A carga total não aumenta, apenas muda a forma de cobrar.",
  },
  {
    mito: "“Tudo muda da noite para o dia.”",
    fato: "A transição leva 7 anos, de 2026 a 2033, com alíquotas se ajustando aos poucos.",
  },
  {
    mito: "“Vai pesar mais para quem ganha menos.”",
    fato: "Cesta básica, saúde e educação terão alíquota reduzida ou zero, com devolução para famílias de baixa renda.",
  },
];

function Index() {
  return (
    <div className="bg-aurora min-h-screen font-sans text-foreground">
      <SiteNav />

      <main id="topo">
        {/* HERO SECTION COM IMAGEM DE FUNDO ATMOSFÉRICA BEM VISÍVEL */}
        <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 md:pt-28 md:pb-28">
          {/* Imagem de Fundo Panorâmica bem visível com máscara suave */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
            <img
              src="/nexo_hero_bg.jpg"
              alt="Nexo Tributário - Paisagem e Rede Inteligente"
              className="h-full w-full object-cover object-center opacity-65 sm:opacity-75 scale-105 transition-transform duration-1000"
            />
            {/* Gradientes translúcidos que destacam as luzes da imagem preservando contraste */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/45 to-background" />
            <div className="absolute inset-0 bg-radial-[circle_at_25%_40%] from-transparent via-background/60 to-background/90" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="animate-rise space-y-6">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-primary ring-1 ring-primary/30">
                    <Sparkles className="size-3.5 text-primary" />
                    Reforma Tributária · Emenda Constitucional 132/2023
                  </span>
                </div>

                <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl md:text-7xl">
                  Cinco impostos,
                  <br />
                  <span className="text-primary text-glow">um caminho claro.</span>
                </h1>
                <p className="max-w-[46ch] text-base sm:text-lg leading-relaxed text-foreground/90 text-pretty">
                  A Reforma Tributária reúne PIS, COFINS, IPI, ICMS e ISS em apenas dois tributos sobre
                  o consumo (IBS + CBS). Uma nova era de transparência e previsibilidade fiscal para empresas e cidadãos.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#antes-depois"
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_28px_var(--color-glow)]"
                  >
                    Ver o antes e depois
                    <ArrowRight className="size-4" />
                  </a>
                  <Link
                    to="/simulador"
                    className="glass-strong inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-foreground ring-1 ring-border transition-colors hover:bg-glass hover:text-primary shadow-glass"
                  >
                    <Calculator className="size-4 text-primary" />
                    Abrir Simuladores
                  </Link>
                </div>
              </div>

              {/* HERO CARD: antes/depois com glassmorphism nítido */}
              <div className="animate-rise [animation-delay:150ms]">
                <div className="relative overflow-hidden rounded-3xl bg-card/90 p-5 sm:p-6 shadow-glass ring-1 ring-border backdrop-blur-2xl">
                  <div className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-primary/15 blur-3xl" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-background/90 p-5 ring-1 ring-border shadow-sm">
                      <p className="text-[11px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">Hoje</p>
                      <p className="mt-2 font-display text-xl font-semibold">5 tributos</p>
                      <ul className="mt-4 space-y-2">
                        {antigos.map((t) => (
                          <li
                            key={t.nome}
                            className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2 text-sm ring-1 ring-border/60"
                          >
                            <span className="font-medium">{t.nome}</span>
                            <span className="text-xs text-muted-foreground">{t.tipo}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-col rounded-2xl bg-primary/[0.12] p-5 ring-1 ring-primary/30 shadow-sm">
                      <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">A partir de 2033</p>
                      <p className="mt-2 font-display text-xl font-semibold">2 tributos</p>
                      <div className="mt-4 space-y-2">
                        {novos.map((t) => (
                          <div
                            key={t.nome}
                            className="flex items-center justify-between rounded-lg bg-background/80 px-3 py-3 text-sm ring-1 ring-primary/20"
                          >
                            <span className="font-medium">{t.nome}</span>
                            <span className="text-xs text-muted-foreground">{t.tipo}</span>
                          </div>
                        ))}
                      </div>
                      <p className="mt-auto pt-4 text-xs leading-relaxed text-muted-foreground">
                        Juntos, formam o IVA dual, o modelo usado em mais de 170 países.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <span className="grid size-5 place-items-center rounded-full bg-primary text-primary-foreground shrink-0">
                      <ArrowRight className="size-3" />
                    </span>
                    Menos siglas, mais transparência: da produção ao seu carrinho.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NÚMEROS / IMPACTO */}
        <section className="border-y border-border bg-background/40">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 md:py-10">
            {[
              { numero: "5 em 2", legenda: "tributos unificados em CBS e IBS" },
              { numero: "7 anos", legenda: "de transição gradual (2026 a 2033)" },
              { numero: "0%", legenda: "de imposto para itens da Cesta Básica Nacional" },
              { numero: "100%", legenda: "de crédito financeiro na compra de insumos" },
            ].map((d) => (
              <div key={d.numero} className="p-2 sm:p-3">
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-primary">
                  {d.numero}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-muted-foreground">{d.legenda}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CARD DESTACADO: NOTÍCIAS E FONTES ATIVAS */}
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-glass ring-1 ring-primary/25 bg-gradient-to-r from-background/90 via-card/80 to-background/90">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-[65ch]">
                <div className="flex items-center gap-2">
                  <span className="grid size-8 place-items-center rounded-lg bg-primary/15 text-primary ring-1 ring-primary/30">
                    <Newspaper className="size-4" />
                  </span>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    Atualizações & Notícias
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                  Acompanhe as novidades da Reforma Tributária em tempo real
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Fique por dentro das últimas notícias, votações de projetos regulamentadores, cronogramas de adaptação das empresas e análises setoriais.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href="https://www.cnnbrasil.com.br/tudo-sobre/reforma-tributaria/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs sm:text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_24px_var(--color-glow)]"
                >
                  <Newspaper className="size-4" />
                  <span>Notícias (CNN Brasil)</span>
                  <ExternalLink className="size-3.5" />
                </a>

                <a
                  href="https://www.infomoney.com.br/tudo-sobre/reforma-tributaria/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs sm:text-sm font-medium text-foreground hover:bg-glass-strong transition-colors"
                >
                  <TrendingUp className="size-4 text-primary" />
                  <span>Análises (InfoMoney)</span>
                  <ExternalLink className="size-3.5" />
                </a>

                <a
                  href="https://piloto-cbs.tributos.gov.br/servico/calculadora-consumo/calculadora"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs sm:text-sm font-medium text-foreground hover:bg-glass-strong transition-colors"
                >
                  <Calculator className="size-4 text-emerald-400" />
                  <span>Calculadora Oficial (Receita)</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ANTES E DEPOIS */}
        <section id="antes-depois" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-[34ch]">
            <p className="text-sm font-semibold text-primary">Antes e depois</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              O que muda no seu dia a dia
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                t: "Preço transparente",
                antes: "Imposto embutido e invisível na etiqueta. Você nunca sabia quanto do valor pago era tributo.",
                depois: "Imposto calculado por fora e destacado no comprovante fiscal. Transparência item a item.",
              },
              {
                t: "Fim do imposto em cascata",
                antes: "Imposto cobrado sobre imposto em cada etapa da cadeia produtiva, encarecendo o produto final.",
                depois: "Crédito financeiro integral: a empresa desconta todo o tributo pago nas compras e insumos.",
              },
              {
                t: "Destino, não origem",
                antes: "Guerra fiscal entre estados e municípios disputando onde o imposto ficava.",
                depois: "O imposto fica onde a mercadoria ou serviço é consumido, equilibrando a arrecadação nacional.",
              },
            ].map((b) => (
              <div key={b.t} className="glass flex flex-col rounded-3xl p-6 sm:p-7 shadow-glass">
                <h3 className="font-display text-xl font-semibold">{b.t}</h3>
                <div className="mt-6 space-y-4 text-sm leading-relaxed">
                  <div className="rounded-2xl bg-destructive/10 p-4 ring-1 ring-destructive/20">
                    <p className="text-[11px] font-semibold tracking-wider text-destructive uppercase">Como é hoje</p>
                    <p className="mt-1.5 text-muted-foreground">{b.antes}</p>
                  </div>
                  <div className="rounded-2xl bg-primary/10 p-4 ring-1 ring-primary/25">
                    <p className="text-[11px] font-semibold tracking-wider text-primary uppercase">Como fica</p>
                    <p className="mt-1.5 text-foreground">{b.depois}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LINHA DO TEMPO */}
        <section id="linha-do-tempo" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-[34ch]">
            <p className="text-sm font-semibold text-primary">Cronograma de Transição</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Uma transição suave até 2033
            </h2>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t) => (
              <div key={t.ano} className="glass group rounded-3xl p-6 sm:p-7 shadow-glass transition-all hover:bg-glass-strong">
                <span className="font-display text-3xl sm:text-4xl font-semibold text-primary">{t.ano}</span>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* IMPACTO POR PERFIL */}
        <section id="perfis" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-[34ch]">
            <p className="text-sm font-semibold text-primary">Por perfil</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              O que muda para quem?
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {perfis.map((p) => (
              <div key={p.titulo} className="glass flex flex-col rounded-3xl p-6 sm:p-7 shadow-glass">
                <span className="grid size-11 place-items-center rounded-2xl bg-primary/15 text-primary ring-1 ring-primary/30">
                  <i className={`${p.iconClass} text-lg leading-none`} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{p.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
                <div className="mt-auto pt-6">
                  <div className="rounded-2xl bg-background/50 p-4 ring-1 ring-border">
                    <p className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">Exemplo real</p>
                    <p className="mt-1 text-xs leading-relaxed">{p.exemplo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MITOS E VERDADES */}
        <section id="mitos" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-16 sm:px-6 md:py-24">
          <div className="max-w-[34ch]">
            <p className="text-sm font-semibold text-primary">Mitos e verdades</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Separando o fato do ruído
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {mitos.map((m) => (
              <div key={m.mito} className="glass rounded-3xl p-6 sm:p-7 shadow-glass">
                <p className="font-display text-base sm:text-lg font-semibold text-destructive">{m.mito}</p>
                <div className="mt-4 rounded-2xl bg-background/60 p-4 ring-1 ring-border">
                  <p className="text-[11px] font-semibold tracking-wider text-primary uppercase">Fato</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{m.fato}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MINI-GUIA / MANUAL PARA USO NO CELULAR */}
        <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-glass ring-1 ring-emerald-500/30">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
              <div className="flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40 shrink-0">
                  <Smartphone className="size-6" />
                </span>
                <div>
                  <span className="text-[11px] font-semibold tracking-wider text-emerald-400 uppercase">
                    Acesso Rápido Mobile
                  </span>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mt-0.5">
                    Como usar o Nexo Tributário direto no seu celular
                  </h3>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-[45ch]">
                Você pode fixar a plataforma na tela inicial do seu smartphone para consultar simuladores e alíquotas a qualquer momento.
              </p>
            </div>

            {/* Passos Diretos: iOS vs Android */}
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {/* Card iOS */}
              <div className="rounded-2xl bg-background/50 p-5 ring-1 ring-border space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Share2 className="size-4 text-emerald-400" />
                  <span>No iPhone / iPad (Safari)</span>
                </div>
                <ol className="space-y-2 text-xs text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>
                    Abra o Safari e toque no botão <strong>Compartilhar</strong> (ícone de quadrado com seta).
                  </li>
                  <li>
                    Role as opções e toque em <strong>"Adicionar à Tela de Início"</strong>.
                  </li>
                  <li>
                    Toque em <strong>"Adicionar"</strong> no canto superior direito.
                  </li>
                </ol>
              </div>

              {/* Card Android */}
              <div className="rounded-2xl bg-background/50 p-5 ring-1 ring-border space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <MoreVertical className="size-4 text-emerald-400" />
                  <span>No Android (Google Chrome)</span>
                </div>
                <ol className="space-y-2 text-xs text-muted-foreground leading-relaxed list-decimal list-inside">
                  <li>
                    Toque nos <strong>três pontinhos (⋮)</strong> no topo do navegador.
                  </li>
                  <li>
                    Selecione <strong>"Instalar aplicativo"</strong> ou <strong>"Adicionar à tela inicial"</strong>.
                  </li>
                  <li>
                    Confirme o toque. O ícone aparecerá junto aos seus aplicativos!
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
