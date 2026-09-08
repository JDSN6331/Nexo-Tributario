import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  HelpCircle,
  Lightbulb,
  Search,
} from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-nav";

export const Route = createFileRoute("/aprender")({
  head: () => ({
    meta: [
      { title: "FAQ e Glossário da Reforma Tributária | Nexo Tributário" },
      {
        name: "description",
        content:
          "Perguntas frequentes e glossário da Reforma Tributária (LC 214/2025) explicados em linguagem simples, com exemplos numéricos, para tirar dúvidas antes e durante o uso dos simuladores.",
      },
      { property: "og:title", content: "FAQ e Glossário da Reforma Tributária | Nexo Tributário" },
      {
        property: "og:description",
        content:
          "IBS, CBS, crédito financeiro, split payment, cashback e cesta básica explicados com exemplos práticos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Aprender,
});

type Pergunta = {
  q: string;
  a: string;
  exemplo?: string;
  grupo: "Fundamentos" | "Empresas" | "Consumidor" | "Usar as ferramentas";
  destaque?: boolean;
};

const perguntas: Pergunta[] = [
  {
    grupo: "Fundamentos",
    q: "O que a Reforma Tributária muda, na prática?",
    a: "Cinco tributos sobre consumo (PIS, COFINS, IPI, ICMS e ISS) são substituídos por dois: a CBS, federal, e o IBS, compartilhado entre estados e municípios. A lógica passa a ser de IVA: cada etapa paga imposto apenas sobre o valor que agrega, porque tudo o que foi pago na etapa anterior vira crédito.",
    exemplo:
      "Uma indústria vende R$ 1.000,00 a um distribuidor e recolhe imposto sobre R$ 1.000,00. O distribuidor revende por R$ 1.500,00: em vez de pagar sobre os R$ 1.500,00 inteiros, ele desconta o crédito da compra e paga apenas sobre os R$ 500,00 que agregou.",
  },
  {
    grupo: "Fundamentos",
    q: "Por que se fala em 26,5%? Essa alíquota já está valendo?",
    a: "Não. 26,5% é a alíquota de referência estimada para a soma de CBS e IBS, usada como teto de cálculo nos estudos oficiais. O percentual definitivo será fixado por lei conforme a arrecadação observada durante a transição.",
    exemplo:
      "Em todas as calculadoras deste site, 26,5% é apenas o parâmetro padrão. Você pode e deve testar percentuais diferentes para entender a sensibilidade do seu resultado.",
  },
  {
    grupo: "Fundamentos",
    q: "O que significa imposto 'por dentro' e 'por fora'?",
    a: "Hoje o tributo está embutido no preço: você não vê quanto pagou. No novo modelo ele é calculado por fora e destacado na nota, item por item, o que torna a carga visível, mesmo quando o valor final não muda.",
    exemplo:
      "Produto de R$ 100,00 com 22% embutidos: a base real é R$ 78,00 e o imposto R$ 22,00. Por fora, os mesmos R$ 78,00 com 26,5% resultam em R$ 20,67 de imposto e preço final de R$ 98,67.",
  },
  {
    grupo: "Empresas",
    destaque: true,
    q: "PIS e COFINS deixam de existir em 2027. Como fica a compensação?",
    a: "Em 1º de janeiro de 2027 a CBS substitui integralmente o PIS e a COFINS. Os saldos de créditos acumulados no regime não cumulativo (Lei 10.637/02 e Lei 10.833/03) até 31/12/2026 são preservados, atualizados pela taxa Selic e podem ser compensados contra a CBS devida a partir de 2027. Já em 2026 (ano-teste), as alíquotas simbólicas de CBS (0,9%) e IBS (0,1%) são integralmente compensáveis com o PIS/COFINS do mesmo período — sem carga extra.",
    exemplo:
      "Uma distribuidora que encerra 2026 com R$ 120.000,00 de crédito acumulado de PIS/COFINS pode usar esse saldo, corrigido pela Selic, para abater a CBS devida em janeiro de 2027 e nos meses seguintes, até o esgotamento. Se não conseguir compensar tudo, pode requerer o ressarcimento em espécie junto à Receita Federal.",
  },
  {
    grupo: "Empresas",
    destaque: true,
    q: "Quem está no regime cumulativo de PIS/COFINS ganha ou perde com a CBS?",
    a: "Ganha. No regime cumulativo atual, a empresa paga PIS/COFINS sem direito a abater nenhum crédito das compras — o imposto vira custo direto. Com a CBS, o crédito financeiro é amplo e imediato: toda compra tributada gera crédito, independentemente do regime anterior. Empresas de serviços no Lucro Presumido, por exemplo, passam de zero crédito para crédito integral.",
    exemplo:
      "Escritório de advocacia no Lucro Presumido com faturamento de R$ 80.000/mês e despesas tributadas de R$ 25.000/mês: hoje paga 3,65% de PIS/COFINS (R$ 2.920) sem crédito nenhum. No novo modelo, o débito é R$ 21.200 (26,5%), mas o crédito de R$ 6.625 reduz o imposto líquido para R$ 14.575. A alíquota nominal é maior, mas a carga efetiva precisa ser comparada caso a caso.",
  },
  {
    grupo: "Empresas",
    destaque: true,
    q: "O que acontece com os créditos acumulados de PIS/COFINS na virada de 2026 para 2027?",
    a: "Os créditos escriturados na EFD-Contribuições até 31/12/2026 são homologados pela Receita Federal e convertidos em créditos da CBS. Eles recebem atualização monetária pela taxa Selic e podem ser usados para: (1) compensação contra a CBS devida mês a mês; (2) ressarcimento em espécie, quando não houver débitos suficientes para absorver o saldo; (3) compensação cruzada com outros tributos federais administrados pela RFB (IRPJ, CSLL, etc.), nos termos da regulamentação.",
    exemplo:
      "Exportador de café com R$ 500.000 de créditos acumulados de PIS/COFINS (por imunidade na exportação) pode requerer o ressarcimento desses créditos ou utilizá-los contra a CBS que incidirá nas vendas ao mercado interno a partir de 2027.",
  },
  {
    grupo: "Empresas",
    q: "O que é crédito financeiro e por que ele importa tanto?",
    a: "É o direito de abater todo o IBS/CBS pago nas compras, inclusive em despesas que hoje não geram crédito, desde que ligadas à atividade. Isso elimina o efeito cascata e reduz o imposto que vira custo.",
    exemplo:
      "Empresa com receita de R$ 100.000,00 e compras de R$ 55.000,00: débito de R$ 26.500,00 menos crédito de R$ 14.575,00 resulta em R$ 11.925,00 a pagar. Se hoje 40% dessas compras não geram crédito, o valor devido é maior (a diferença é o custo da cascata).",
  },
  {
    grupo: "Empresas",
    q: "Vale a pena continuar no Simples Nacional?",
    a: "Depende do peso das vendas para outras empresas. Quem permanece paga a guia única, mas transfere pouco crédito ao cliente PJ, o que pressiona o preço. Quem opta por apurar IBS/CBS por fora gera crédito integral e fica mais competitivo no B2B.",
    exemplo:
      "Prestador com faturamento de R$ 40.000,00/mês e 80% de vendas B2B nega cerca de R$ 8.480,00 de crédito por mês aos clientes. Esse valor tende a virar desconto exigido. Compare com a economia da guia única na calculadora do Simples.",
  },
  {
    grupo: "Empresas",
    q: "O que é split payment?",
    a: "É o recolhimento do imposto no momento da liquidação financeira: ao receber o pagamento, a parcela de IBS/CBS é separada e enviada ao fisco automaticamente. Reduz a inadimplência tributária, mas muda o fluxo de caixa e ainda tem detalhes operacionais em definição.",
    exemplo:
      "Venda de R$ 10.000,00 com R$ 2.650,00 de imposto: a empresa recebe R$ 7.350,00 na conta e o restante segue direto para o fisco, em vez de esperar a apuração do mês.",
  },
  {
    grupo: "Consumidor",
    q: "Os preços vão subir?",
    a: "Varia por setor. Itens da cesta básica ficam com alíquota zero; saúde, educação, medicamentos e transporte público têm redução de 60%. Serviços em geral, hoje pouco tributados, tendem a sentir aumento. O efeito líquido depende do seu padrão de consumo.",
    exemplo:
      "Uma família que gasta R$ 900,00 em cesta básica, R$ 600,00 em serviços essenciais e R$ 1.200,00 em consumo geral pode simular esse saldo na calculadora de impacto doméstico.",
  },
  {
    grupo: "Consumidor",
    q: "Como funciona o cashback?",
    a: "É a devolução de parte do IBS/CBS pago por famílias de baixa renda inscritas no CadÚnico, aplicada especialmente em energia, água, gás e itens essenciais. É um mecanismo de justiça fiscal que reduz a carga efetiva na ponta.",
    exemplo:
      "As calculadoras deste site não incluem o cashback, então o resultado para famílias elegíveis tende a ser mais favorável do que o estimado.",
  },
  {
    grupo: "Usar as ferramentas",
    q: "Qual ferramenta devo usar em cada situação?",
    a: "Para valores com validade legal, use a calculadora oficial da Receita Federal. Para entender rapidamente a lógica de preço, crédito ou impacto, use as calculadoras simplificadas. Para decidir com base em cenários ano a ano, use o simulador avançado.",
    exemplo:
      "Fechando preço de contrato longo? Comece pelo simulador avançado, escolha o ano de vigência e depois confirme com a ferramenta oficial.",
  },
  {
    grupo: "Usar as ferramentas",
    q: "Posso levar os resultados para a minha planilha?",
    a: "Sim. Cada calculadora simplificada e o simulador avançado têm exportação em CSV e XLSX, com as premissas usadas e os valores calculados, para você conferir e arquivar no controle interno.",
    exemplo:
      "O arquivo traz três colunas (seção, campo e valor), além da data de geração, facilitando comparar simulações feitas em momentos diferentes.",
  },
  {
    grupo: "Usar as ferramentas",
    q: "Os números daqui têm valor legal?",
    a: "Não. São estimativas educativas com parâmetros simplificados, feitas para explicar a mecânica do novo modelo. Decisões fiscais exigem as ferramentas oficiais e orientação contábil.",
  },
];

type Termo = { termo: string; definicao: string; exemplo: string };

const glossario: Termo[] = [
  {
    termo: "IVA dual",
    definicao:
      "Modelo em que o imposto sobre consumo é cobrado por dois tributos com a mesma base: um federal (CBS) e um subnacional (IBS).",
    exemplo: "Uma única base de cálculo gera duas linhas na nota fiscal: CBS e IBS.",
  },
  {
    termo: "CBS",
    definicao:
      "Contribuição sobre Bens e Serviços, de competência federal, que substitui PIS e COFINS (e absorve parte do IPI).",
    exemplo: "Em 2027 a CBS assume integralmente o lugar do PIS/COFINS.",
  },
  {
    termo: "IBS",
    definicao:
      "Imposto sobre Bens e Serviços, compartilhado por estados e municípios, que substitui ICMS e ISS e é administrado pelo Comitê Gestor.",
    exemplo: "Entre 2029 e 2032 o IBS cresce 10% ao ano enquanto ICMS e ISS caem na mesma proporção.",
  },
  {
    termo: "Imposto Seletivo",
    definicao:
      "Tributo extra sobre produtos nocivos à saúde ou ao meio ambiente, com finalidade de desestímulo ao consumo.",
    exemplo: "Cigarros, bebidas alcoólicas e alguns combustíveis entram nessa lista.",
  },
  {
    termo: "Crédito financeiro",
    definicao:
      "Direito de abater todo imposto pago nas aquisições ligadas à atividade, sem a limitação atual a insumos diretos.",
    exemplo: "A conta de energia da loja passa a gerar crédito, o que hoje em geral não ocorre.",
  },
  {
    termo: "Não cumulatividade plena",
    definicao:
      "Princípio segundo o qual o imposto incide apenas sobre o valor agregado em cada etapa da cadeia.",
    exemplo:
      "Comprou por R$ 1.000,00 e vendeu por R$ 1.500,00? O imposto líquido recai sobre os R$ 500,00.",
  },
  {
    termo: "Alíquota de referência",
    definicao:
      "Percentual calculado para manter a arrecadação atual; serve de parâmetro até a fixação definitiva em lei.",
    exemplo: "Estimativa hoje divulgada: cerca de 26,5% somando CBS e IBS.",
  },
  {
    termo: "Cesta básica nacional",
    definicao: "Lista de alimentos essenciais com alíquota zero de IBS e CBS.",
    exemplo: "Arroz, feijão, leite e pão de forma comum entram na lista de alíquota zero.",
  },
  {
    termo: "Cashback",
    definicao:
      "Devolução de parte do imposto pago por famílias de baixa renda inscritas no CadÚnico.",
    exemplo: "Contas de luz e gás são prioridade na devolução.",
  },
  {
    termo: "Split payment",
    definicao:
      "Recolhimento automático do imposto no momento do pagamento da operação, separando a parcela do fisco.",
    exemplo: "Na venda por cartão, a parcela de IBS/CBS é segregada na liquidação.",
  },
  {
    termo: "Crédito presumido",
    definicao:
      "Crédito atribuído por lei ao comprador quando o fornecedor está fora do regime, como o produtor rural pessoa física.",
    exemplo: "Agroindústria que compra de produtor não contribuinte aproveita crédito presumido.",
  },
  {
    termo: "Simples Nacional híbrido",
    definicao:
      "Opção de permanecer no Simples para os demais tributos e apurar IBS/CBS pelo regime regular, gerando crédito integral ao cliente.",
    exemplo: "Comum em empresas com forte presença em vendas B2B.",
  },
  {
    termo: "Período de transição",
    definicao:
      "Janela de 2026 a 2033 em que os tributos antigos convivem com os novos, em proporções decrescentes.",
    exemplo: "2026 é ano-teste com alíquotas simbólicas de 0,9% e 0,1%.",
  },
  {
    termo: "Comitê Gestor do IBS",
    definicao:
      "Entidade que reúne estados e municípios para arrecadar, fiscalizar e distribuir a receita do IBS.",
    exemplo: "É a instância que uniformiza interpretação e obrigações do IBS.",
  },
];

const grupos = ["Todas", "Fundamentos", "Empresas", "Consumidor", "Usar as ferramentas"] as const;

function normalizar(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function Aprender() {
  const [busca, setBusca] = useState("");
  const [grupo, setGrupo] = useState<(typeof grupos)[number]>("Todas");
  const [aberta, setAberta] = useState<string | null>(perguntas[0]?.q ?? null);

  const termoBusca = normalizar(busca.trim());

  const faq = useMemo(
    () =>
      perguntas.filter(
        (p) =>
          (grupo === "Todas" || p.grupo === grupo) &&
          (termoBusca === "" ||
            normalizar(`${p.q} ${p.a} ${p.exemplo ?? ""}`).includes(termoBusca)),
      ),
    [grupo, termoBusca],
  );

  const termos = useMemo(
    () =>
      glossario.filter(
        (t) =>
          termoBusca === "" ||
          normalizar(`${t.termo} ${t.definicao} ${t.exemplo}`).includes(termoBusca),
      ),
    [termoBusca],
  );

  return (
    <div className="bg-aurora min-h-screen font-sans text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-6 pt-16 pb-16">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium text-muted-foreground">
          <BookOpen className="size-3.5 text-primary" />
          Tire a dúvida antes de calcular
        </span>
        <h1 className="mt-6 max-w-[26ch] font-display text-4xl font-semibold tracking-tight text-balance md:text-6xl">
          Perguntas frequentes e glossário.
        </h1>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted-foreground text-pretty">
          Cada resposta vem com um exemplo numérico, para você entender o conceito e reconhecê-lo na
          hora de preencher as calculadoras.
        </p>

        <div className="glass mt-9 flex items-center gap-3 rounded-2xl px-5 py-3 shadow-glass">
          <Search className="size-4 shrink-0 text-primary" />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por termo ou dúvida: crédito, cashback, Simples…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground/70"
            aria-label="Buscar no FAQ e no glossário"
          />
        </div>

        {/* FAQ */}
        <section className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              Dúvidas frequentes
            </h2>
            <div className="flex flex-wrap gap-2">
              {grupos.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGrupo(g)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${grupo === g
                      ? "bg-primary text-primary-foreground shadow-[0_0_20px_var(--color-glow)]"
                      : "glass text-muted-foreground hover:bg-glass-strong hover:text-foreground"
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-7 space-y-3">
            {faq.length === 0 && (
              <p className="glass rounded-2xl px-6 py-8 text-center text-sm text-muted-foreground">
                Nenhuma pergunta encontrada para essa busca.
              </p>
            )}
            {faq.map((p) => {
              const open = aberta === p.q;
              return (
                <article key={p.q} className="glass overflow-hidden rounded-2xl shadow-glass">
                  <button
                    type="button"
                    onClick={() => setAberta(open ? null : p.q)}
                    aria-expanded={open}
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                  >
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
                      <HelpCircle className="size-4" />
                    </span>
                    <span className="flex-1">
                      <span className="block text-sm font-semibold md:text-base">{p.q}</span>
                      <span className="mt-0.5 block text-[11px] tracking-wide text-muted-foreground uppercase">
                        {p.grupo}
                      </span>
                    </span>
                    <ChevronDown
                      className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180 text-primary" : ""
                        }`}
                    />
                  </button>
                  {open && (
                    <div className="px-6 pb-6 pl-19">
                      <p className="max-w-[74ch] text-sm leading-relaxed text-muted-foreground">
                        {p.a}
                      </p>
                      {p.exemplo && (
                        <div className="mt-4 flex gap-3 rounded-2xl bg-primary/[0.07] p-4 ring-1 ring-primary/20">
                          <Lightbulb className="mt-0.5 size-4 shrink-0 text-primary" />
                          <p className="max-w-[70ch] text-xs leading-relaxed">
                            <span className="font-semibold text-primary">Exemplo. </span>
                            {p.exemplo}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* GLOSSÁRIO */}
        <section className="mt-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Glossário</h2>
          <p className="mt-3 max-w-[58ch] text-sm leading-relaxed text-muted-foreground">
            Os termos que aparecem nas calculadoras, no simulador e no Radar de mudanças, cada um
            com um exemplo curto.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {termos.length === 0 && (
              <p className="glass rounded-2xl px-6 py-8 text-center text-sm text-muted-foreground md:col-span-2 lg:col-span-3">
                Nenhum termo encontrado para essa busca.
              </p>
            )}
            {termos.map((t) => (
              <article
                key={t.termo}
                className="glass flex flex-col rounded-2xl p-5 shadow-glass transition-all hover:ring-1 hover:ring-primary/25"
              >
                <h3 className="font-display text-lg font-semibold text-primary">{t.termo}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground">
                  {t.definicao}
                </p>
                <p className="mt-4 rounded-xl bg-background/45 px-3 py-2.5 text-[11px] leading-relaxed ring-1 ring-border">
                  {t.exemplo}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="glass mt-14 flex flex-wrap items-center justify-between gap-5 rounded-3xl p-7 shadow-glass ring-1 ring-primary/20">
          <p className="max-w-[54ch] text-sm leading-relaxed text-muted-foreground">
            Entendeu o conceito? Agora coloque os seus números e exporte o resultado para a sua
            planilha.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/ferramentas"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_24px_var(--color-glow)]"
            >
              Ir para as calculadoras
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/radar"
              className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors hover:bg-glass-strong"
            >
              Radar de mudanças
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
