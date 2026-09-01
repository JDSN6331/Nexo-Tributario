import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  Building2,
  Calculator,
  ExternalLink,
  Info,
  Layers,
  Receipt,
  Scale,
  ShoppingBasket,
  Sprout,
  TrendingDown,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";
import { SiteFooter, SiteNav } from "@/components/site-nav";
import { ExportBar } from "@/components/export-bar";
import type { ExportPayload } from "@/lib/export";
import {
  REGIMES,
  brl,
  creditoNaoCumulativo,
  pct,
  porDentro,
  porFora,
} from "@/lib/reforma";
import { CurrencyInput } from "@/components/currency-input";

export const Route = createFileRoute("/ferramentas")({
  head: () => ({
    meta: [
      { title: "Calculadoras da Reforma Tributária | Nexo Tributário" },
      {
        name: "description",
        content:
          "Calculadoras práticas de preço por fora, crédito não cumulativo, split payment e capital de giro, cesta básica nacional, diagnóstico de regimes 2027+ e agropecuária.",
      },
      {
        property: "og:title",
        content: "Calculadoras da Reforma Tributária | Nexo Tributário",
      },
      {
        property: "og:description",
        content:
          "Preço destacado, split payment, cesta básica e diagnóstico Simples Nacional × CBS/IBS.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Ferramentas,
});

function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  step?: number;
}) {
  return (
    <label className="block">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
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
    </label>
  );
}

function Result({
  items,
  nota,
}: {
  items: { label: string; value: string; destaque?: boolean }[];
  nota?: string;
}) {
  return (
    <div className="rounded-2xl bg-primary/[0.07] p-5 ring-1 ring-primary/20">
      <dl className="space-y-3">
        {items.map((i) => (
          <div key={i.label} className="flex items-baseline justify-between gap-4">
            <dt className="text-sm text-muted-foreground">{i.label}</dt>
            <dd
              className={
                i.destaque
                  ? "font-display text-xl font-semibold text-primary"
                  : "text-sm font-semibold"
              }
            >
              {i.value}
            </dd>
          </div>
        ))}
      </dl>
      {nota && (
        <p className="mt-4 flex gap-2 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0 text-primary" />
          {nota}
        </p>
      )}
    </div>
  );
}

function CalcShell({
  titulo,
  descricao,
  children,
}: {
  titulo: string;
  descricao: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="font-display text-2xl font-semibold">{titulo}</h3>
      <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-muted-foreground">{descricao}</p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">{children}</div>
    </div>
  );
}

/* ==========================================================================
   CALCULADORAS INDIVIDUAIS
   ========================================================================== */

function CalcPreco() {
  const [preco, setPreco] = useState(1000);
  const [cargaAtual, setCargaAtual] = useState(22);
  const [regime, setRegime] = useState<number>(REGIMES[0].aliquota);

  const atual = porDentro(preco, cargaAtual / 100);
  const novo = porFora(atual.base, regime);

  const payload: ExportPayload = {
    nome: "nexo_tributario_preco",
    titulo: "Nexo Tributário | Preço e Imposto Destacado",
    linhas: [
      { secao: "Premissas", campo: "Preço atual ao consumidor", valor: brl(preco) },
      {
        secao: "Premissas",
        campo: "Carga tributária embutida hoje (estimada)",
        valor: `${cargaAtual}%`,
      },
      {
        secao: "Premissas",
        campo: "Regime no novo modelo",
        valor: REGIMES.find((r) => r.aliquota === regime)?.label ?? pct(regime),
      },
      { secao: "Premissas", campo: "Alíquota aplicada", valor: pct(regime) },
      { secao: "Resultados", campo: "Base de cálculo (preço sem imposto)", valor: brl(atual.base) },
      { secao: "Resultados", campo: "Imposto hoje (por dentro)", valor: brl(atual.imposto) },
      {
        secao: "Resultados",
        campo: `Imposto novo (${pct(regime)}, por fora)`,
        valor: brl(novo.imposto),
      },
      { secao: "Resultados", campo: "Preço final estimado", valor: brl(novo.total) },
    ],
  };

  return (
    <CalcShell
      titulo="Preço e imposto destacado"
      descricao="Hoje o tributo está embutido no preço. No novo modelo ele aparece por fora, destacado na nota. Compare o valor final mantendo a mesma base de cálculo."
    >
      <div className="space-y-4">
        <Field label="Preço atual ao consumidor" value={preco} onChange={setPreco} prefix="R$" step={10} />
        <Field
          label="Carga tributária embutida hoje (estimada)"
          value={cargaAtual}
          onChange={setCargaAtual}
          suffix="%"
        />
        <label className="block">
          <span className="text-xs font-medium text-muted-foreground">Regime no novo modelo</span>
          <select
            value={regime}
            onChange={(e) => setRegime(Number(e.target.value))}
            className="mt-1.5 w-full rounded-xl bg-background/50 px-3 py-2.5 text-sm font-medium ring-1 ring-border outline-none focus:ring-primary/50"
          >
            {REGIMES.map((r) => (
              <option key={r.id} value={r.aliquota}>
                {r.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <Result
          items={[
            { label: "Base (preço sem imposto)", value: brl(atual.base) },
            { label: "Imposto hoje (por dentro)", value: brl(atual.imposto) },
            { label: `Imposto novo (${pct(regime)}, por fora)`, value: brl(novo.imposto) },
            { label: "Preço final estimado", value: brl(novo.total), destaque: true },
          ]}
          nota="A carga embutida varia por produto, estado e cadeia. Use a calculadora oficial para valores com eficácia legal."
        />
        <ExportBar
          payload={payload}
          hint="Exporte as premissas e a composição de preço em PDF, Excel ou CSV."
        />
      </div>
    </CalcShell>
  );
}

function CalcCredito() {
  const [receita, setReceita] = useState(100000);
  const [compras, setCompras] = useState(55000);
  const [cumulatividade, setCumulatividade] = useState(40);
  const r = creditoNaoCumulativo({
    receita,
    comprasComCredito: compras,
    aliquota: 0.265,
    cumulatividadeAtual: cumulatividade / 100,
  });

  const payload: ExportPayload = {
    nome: "nexo_tributario_credito",
    titulo: "Nexo Tributário | Crédito Não Cumulativo e Fim da Cascata",
    linhas: [
      { secao: "Premissas", campo: "Receita bruta", valor: brl(receita) },
      { secao: "Premissas", campo: "Compras e insumos com nota", valor: brl(compras) },
      {
        secao: "Premissas",
        campo: "Parcela de compras sem crédito hoje",
        valor: `${cumulatividade}%`,
      },
      { secao: "Premissas", campo: "Alíquota de referência", valor: "26,5%" },
      { secao: "Resultados", campo: "Débito bruto", valor: brl(r.debito) },
      { secao: "Resultados", campo: "Crédito novo (integral)", valor: brl(r.creditoNovo) },
      { secao: "Resultados", campo: "Imposto devido (novo modelo)", valor: brl(r.impostoNovo) },
      { secao: "Resultados", campo: "Crédito hoje (restrito)", valor: brl(r.creditoAtual) },
      { secao: "Resultados", campo: "Imposto devido hoje (estimado)", valor: brl(r.impostoAtual) },
      { secao: "Resultados", campo: "Economia com crédito integral", valor: brl(r.ganhoCredito) },
    ],
  };

  return (
    <CalcShell
      titulo="Crédito financeiro e fim da cascata"
      descricao="No modelo novo, todo o imposto pago na compra de insumos, bens e serviços ligados à atividade gera crédito financeiro imediato."
    >
      <div className="space-y-4">
        <Field label="Receita bruta no período" value={receita} onChange={setReceita} prefix="R$" step={5000} />
        <Field
          label="Compras e insumos com nota fiscal"
          value={compras}
          onChange={setCompras}
          prefix="R$"
          step={5000}
        />
        <Field
          label="Parcela das compras que hoje NÃO dá crédito"
          value={cumulatividade}
          onChange={setCumulatividade}
          suffix="%"
        />
      </div>
      <div>
        <Result
          items={[
            { label: "Débito bruto (26,5%)", value: brl(r.debito) },
            { label: "Crédito integral novo", value: brl(r.creditoNovo) },
            { label: "Imposto devido no novo modelo", value: brl(r.impostoNovo), destaque: true },
            { label: "Economia mensal estimada", value: brl(r.ganhoCredito) },
          ]}
          nota="Esta calculadora compara o modelo estável (crédito restrito de hoje vs crédito financeiro pleno do novo IVA). Ela não simula a compensação de saldos acumulados de PIS/COFINS na virada para a CBS em 2027 — consulte a seção Aprender para entender o mecanismo de transição."
        />
        <ExportBar
          payload={payload}
          hint="Exporte o comparativo de crédito e não cumulatividade."
        />
      </div>
    </CalcShell>
  );
}

function CalcSplitPayment() {
  const [faturamento, setFaturamento] = useState(250000);
  const [aliquota, setAliquota] = useState(26.5);
  const [percentualEletronico, setPercentualEletronico] = useState(85);
  const [diasFloat, setDiasFloat] = useState(35);

  const baseEletronica = faturamento * (percentualEletronico / 100);
  const retencaoMensal = baseEletronica * (aliquota / 100);
  const retencaoDiaria = retencaoMensal / 22;
  const capitalDeGiroComprometido = retencaoMensal * (diasFloat / 30);
  const custoOportunidadeAnual = capitalDeGiroComprometido * 0.12;

  const payload: ExportPayload = {
    nome: "nexo_tributario_split_payment",
    titulo: "Nexo Tributário | Split Payment e Impacto no Capital de Giro",
    linhas: [
      { secao: "Premissas", campo: "Faturamento mensal da empresa", valor: brl(faturamento) },
      { secao: "Premissas", campo: "Alíquota estimada de IBS/CBS", valor: `${aliquota}%` },
      {
        secao: "Premissas",
        campo: "Vendas liquidadas via PIX/Cartão/Boleto",
        valor: `${percentualEletronico}%`,
      },
      {
        secao: "Premissas",
        campo: "Prazo médio atual de recolhimento (Float)",
        valor: `${diasFloat} dias`,
      },
      {
        secao: "Resultados",
        campo: "Base sujeita a retenção automática imediata",
        valor: brl(baseEletronica),
      },
      {
        secao: "Resultados",
        campo: "Imposto retido na fonte por mês (Split Payment)",
        valor: brl(retencaoMensal),
      },
      {
        secao: "Resultados",
        campo: "Retenção média por dia útil",
        valor: brl(retencaoDiaria),
      },
      {
        secao: "Resultados",
        campo: "Impacto no Capital de Giro (caixa que deixa de flutuar)",
        valor: brl(capitalDeGiroComprometido),
      },
      {
        secao: "Resultados",
        campo: "Custo financeiro anual estimado para repor caixa (12% a.a.)",
        valor: brl(custoOportunidadeAnual),
      },
    ],
  };

  return (
    <CalcShell
      titulo="Split Payment: Retenção Automática e Capital de Giro"
      descricao="Com o Split Payment, o imposto é retido no ato do pagamento (PIX/cartão/boleto), sem esperar a apuração do mês seguinte. Veja quanto de liquidez imediata deixa de transitar pelo caixa da sua empresa."
    >
      <div className="space-y-4">
        <Field
          label="Faturamento mensal da empresa"
          value={faturamento}
          onChange={setFaturamento}
          prefix="R$"
          step={10000}
        />
        <Field
          label="Alíquota estimada de IBS/CBS"
          value={aliquota}
          onChange={setAliquota}
          suffix="%"
          step={0.5}
        />
        <Field
          label="Vendas liquidadas via meios eletrônicos (PIX, Cartão, Boleto)"
          value={percentualEletronico}
          onChange={setPercentualEletronico}
          suffix="%"
        />
        <Field
          label="Prazo médio que você retém o tributo hoje até pagar a guia (dias)"
          value={diasFloat}
          onChange={setDiasFloat}
          suffix="dias"
        />
      </div>
      <div>
        <Result
          items={[
            { label: "Imposto retido na fonte todo mês", value: brl(retencaoMensal) },
            { label: "Retenção média por dia útil", value: brl(retencaoDiaria) },
            {
              label: "Capital de giro que deixa de flutuar no caixa",
              value: brl(capitalDeGiroComprometido),
              destaque: true,
            },
            {
              label: "Custo anual para financiar o déficit (12% a.a.)",
              value: brl(custoOportunidadeAnual),
            },
          ]}
          nota="O Split Payment elimina o float tributário. Empresas com margens apertadas precisam renegociar prazos com fornecedores ou reforçar linhas de crédito."
        />
        <ExportBar
          payload={payload}
          hint="Exporte o estudo do impacto do Split Payment no capital de giro em PDF, Excel ou CSV."
        />
      </div>
    </CalcShell>
  );
}

/* NOVA CALCULADORA 1: Cesta Básica Nacional & Imposto Seletivo */
function CalcCestaBasica() {
  const [gastoCestaZero, setGastoCestaZero] = useState(650); // Arroz, feijão, café, leite, carne, óleo
  const [gastoReduzida, setGastoReduzida] = useState(350); // Frutas adicionais, higiene pessoal
  const [gastoPadrao, setGastoPadrao] = useState(500); // Produtos de limpeza, utilidades
  const [gastoSeletivo, setGastoSeletivo] = useState(200); // Bebidas açucaradas, alcoólicas, etc.
  const [aliquotaSeletivo, setAliquotaSeletivo] = useState(15); // Sobretaxa do Imposto do Pecado

  // Carga tributária atual estimada
  const cargaAtualZero = gastoCestaZero * 0.12; // Hoje muitos estados tributam ICMS residual ou PIS/COFINS
  const cargaAtualReduzida = gastoReduzida * 0.18;
  const cargaAtualPadrao = gastoPadrao * 0.28;
  const cargaAtualSeletivo = gastoSeletivo * 0.38;
  const impostoAtualTotal = cargaAtualZero + cargaAtualReduzida + cargaAtualPadrao + cargaAtualSeletivo;

  // Novo modelo (IBS + CBS + IS)
  const impostoNovoZero = 0; // Alíquota Zero 0%
  const impostoNovoReduzida = gastoReduzida * 0.106; // 10,6% (redução de 60%)
  const impostoNovoPadrao = gastoPadrao * 0.265; // 26,5%
  const impostoNovoSeletivo = gastoSeletivo * (0.265 + aliquotaSeletivo / 100);
  const impostoNovoTotal = impostoNovoZero + impostoNovoReduzida + impostoNovoPadrao + impostoNovoSeletivo;

  const gastoTotal = gastoCestaZero + gastoReduzida + gastoPadrao + gastoSeletivo;
  const diferencaImposto = impostoNovoTotal - impostoAtualTotal;

  const payload: ExportPayload = {
    nome: "nexo_tributario_cesta_basica_seletivo",
    titulo: "Nexo Tributário | Cesta Básica Nacional & Imposto Seletivo",
    linhas: [
      { secao: "Cesta de Compras Mensal", campo: "Cesta Básica Nacional (Alíquota Zero - 0%)", valor: brl(gastoCestaZero) },
      { secao: "Cesta de Compras Mensal", campo: "Alimentos e Higiene (Alíquota Reduzida - 10,6%)", valor: brl(gastoReduzida) },
      { secao: "Cesta de Compras Mensal", campo: "Produtos em Geral (Alíquota Padrão - 26,5%)", valor: brl(gastoPadrao) },
      { secao: "Cesta de Compras Mensal", campo: "Itens Sujeitos a Imposto Seletivo", valor: brl(gastoSeletivo) },
      { secao: "Cesta de Compras Mensal", campo: "Sobretaxa do Imposto Seletivo", valor: `${aliquotaSeletivo}%` },
      { secao: "Resultados", campo: "Gasto total em compras", valor: brl(gastoTotal) },
      { secao: "Resultados", campo: "Imposto estimado hoje (embutido)", valor: brl(impostoAtualTotal) },
      { secao: "Resultados", campo: "Imposto no novo modelo (CBS/IBS + IS)", valor: brl(impostoNovoTotal) },
      {
        secao: "Resultados",
        campo: diferencaImposto <= 0 ? "Economia mensal estimada no carrinho" : "Acréscimo mensal estimado",
        valor: brl(Math.abs(diferencaImposto)),
      },
    ],
  };

  return (
    <CalcShell
      titulo="Cesta Básica Nacional & Imposto Seletivo (Carrinho do Consumidor)"
      descricao="A LC 214/2025 zera a tributação de alimentos essenciais da Cesta Básica Nacional e aplica sobretaxa (Imposto Seletivo) a produtos prejudiciais à saúde ou meio ambiente. Simule o impacto no seu carrinho de compras."
    >
      <div className="space-y-4">
        <Field
          label="Cesta Básica Nacional (Arroz, feijão, café, leite, carne, óleo, pão)"
          value={gastoCestaZero}
          onChange={setGastoCestaZero}
          prefix="R$"
          step={50}
        />
        <Field
          label="Alimentos e Higiene com Alíquota Reduzida em 60% (10,6%)"
          value={gastoReduzida}
          onChange={setGastoReduzida}
          prefix="R$"
          step={50}
        />
        <Field
          label="Itens de Limpeza e Consumo Padrão (26,5%)"
          value={gastoPadrao}
          onChange={setGastoPadrao}
          prefix="R$"
          step={50}
        />
        <Field
          label="Itens com Imposto Seletivo (Bebidas alcoólicas, refrigerantes, cigarros)"
          value={gastoSeletivo}
          onChange={setGastoSeletivo}
          prefix="R$"
          step={50}
        />
        <Field
          label="Sobretaxa estimada do Imposto Seletivo"
          value={aliquotaSeletivo}
          onChange={setAliquotaSeletivo}
          suffix="%"
        />
      </div>
      <div>
        <Result
          items={[
            { label: "Gasto total com as compras", value: brl(gastoTotal) },
            { label: "Imposto hoje (embutido na média)", value: brl(impostoAtualTotal) },
            { label: "Imposto no novo modelo (CBS/IBS + IS)", value: brl(impostoNovoTotal) },
            {
              label: diferencaImposto <= 0 ? "Redução estimada no imposto do carrinho" : "Aumento estimado",
              value: brl(Math.abs(diferencaImposto)),
              destaque: true,
            },
          ]}
          nota="Famílias do Cadastro Único ainda contarão com devolução de tributos (Cashback) de 100% da CBS e 20% do IBS na conta de luz, gás e itens essenciais."
        />
        <ExportBar
          payload={payload}
          hint="Baixe a simulação da cesta básica e imposto seletivo em PDF ou Excel."
        />
      </div>
    </CalcShell>
  );
}

/* NOVA CALCULADORA 2: Diagnóstico de Regimes 2027+ */
function CalcDiagnosticoRegimes() {
  const [faturamento, setFaturamento] = useState(120000);
  const [comprasInsumos, setComprasInsumos] = useState(40000);
  const [percentualB2B, setPercentualB2B] = useState(70);
  const [aliquotaSimplesAtual, setAliquotaSimplesAtual] = useState(9.5);

  // Parcela de IBS/CBS dentro do Simples Nacional (estimada em ~35% da guia)
  const parcelaTributosConsumoSimples = aliquotaSimplesAtual * 0.35;
  const guiaSimplesMensal = faturamento * (aliquotaSimplesAtual / 100);

  // Cenário 1: Permanece 100% no Simples Nacional
  // Cliente B2B só se credita da parcela de consumo do Simples (ex: 3.3%)
  const creditoRepassadoSimplesB2B = faturamento * (percentualB2B / 100) * (parcelaTributosConsumoSimples / 100);

  // Cenário 2: Opta por apurar IBS/CBS por fora (Regime Regular) mantendo IRPJ/CSLL no Simples
  // Débito 26,5% - Crédito 26,5% dos insumos
  const debitoIbsCbs = faturamento * 0.265;
  const creditoIbsCbs = comprasInsumos * 0.265;
  const ibsCbsDevido = Math.max(debitoIbsCbs - creditoIbsCbs, 0);
  const guiaSimplesReduzida = faturamento * ((aliquotaSimplesAtual - parcelaTributosConsumoSimples) / 100);
  const custoTotalOptandoPorFora = ibsCbsDevido + guiaSimplesReduzida;

  // Cliente B2B toma crédito integral de 26,5%
  const creditoRepassadoIntegralB2B = faturamento * (percentualB2B / 100) * 0.265;
  const ganhoCompetitividadeB2B = creditoRepassadoIntegralB2B - creditoRepassadoSimplesB2B;

  const payload: ExportPayload = {
    nome: "nexo_tributario_diagnostico_regimes",
    titulo: "Nexo Tributário | Diagnóstico de Regimes 2027+ (Simples vs CBS/IBS por fora)",
    linhas: [
      { secao: "Premissas da Empresa", campo: "Faturamento mensal", valor: brl(faturamento) },
      { secao: "Premissas da Empresa", campo: "Compras e insumos com nota", valor: brl(comprasInsumos) },
      { secao: "Premissas da Empresa", campo: "Vendas para clientes PJ (B2B)", valor: `${percentualB2B}%` },
      { secao: "Premissas da Empresa", campo: "Alíquota efetiva do Simples Nacional hoje", valor: `${aliquotaSimplesAtual}%` },
      { secao: "Cenário 1: 100% no Simples", campo: "Guia DAS mensal total", valor: brl(guiaSimplesMensal) },
      { secao: "Cenário 1: 100% no Simples", campo: "Crédito repassado aos clientes B2B", valor: brl(creditoRepassadoSimplesB2B) },
      { secao: "Cenário 2: IBS/CBS por fora", campo: "IBS/CBS líquido devido (com créditos)", valor: brl(ibsCbsDevido) },
      { secao: "Cenário 2: IBS/CBS por fora", campo: "DAS residual (IRPJ, CSLL, CPP)", valor: brl(guiaSimplesReduzida) },
      { secao: "Cenário 2: IBS/CBS por fora", campo: "Custo total mensal da empresa", valor: brl(custoTotalOptandoPorFora) },
      { secao: "Cenário 2: IBS/CBS por fora", campo: "Crédito integral repassado aos clientes B2B", valor: brl(creditoRepassadoIntegralB2B) },
      { secao: "Análise Estratégica", campo: "Ganho de atratividade comercial B2B", valor: brl(ganhoCompetitividadeB2B) },
    ],
  };

  const recomendacao =
    percentualB2B >= 60 && ganhoCompetitividadeB2B > (custoTotalOptandoPorFora - guiaSimplesMensal)
      ? "Recomendado migrar para IBS/CBS por fora para manter competitividade com clientes B2B que exigem crédito tributário integral."
      : "Recomendado permanecer no Simples Nacional tradicional se a maioria das suas vendas for para consumidor final (B2C) ou compras tiverem margens altas.";

  return (
    <CalcShell
      titulo="Diagnóstico de Regimes 2027+: Simples Nacional vs CBS/IBS por fora"
      descricao="A partir de 2027, empresas do Simples podem escolher recolher IBS/CBS no regime normal (repassando 26,5% de crédito aos clientes PJ) ou manter tudo no DAS (repassando crédito restrito). Veja o que compensa para sua carteira de clientes."
    >
      <div className="space-y-4">
        <Field
          label="Faturamento mensal da empresa"
          value={faturamento}
          onChange={setFaturamento}
          prefix="R$"
          step={5000}
        />
        <Field
          label="Compras e insumos com nota fiscal"
          value={comprasInsumos}
          onChange={setComprasInsumos}
          prefix="R$"
          step={5000}
        />
        <Field
          label="Parcela das vendas para empresas PJ que tomam crédito (B2B)"
          value={percentualB2B}
          onChange={setPercentualB2B}
          suffix="%"
        />
        <Field
          label="Alíquota efetiva média do Simples hoje"
          value={aliquotaSimplesAtual}
          onChange={setAliquotaSimplesAtual}
          suffix="%"
          step={0.5}
        />
      </div>
      <div>
        <Result
          items={[
            { label: "Custo no Simples tradicional (DAS)", value: brl(guiaSimplesMensal) },
            { label: "Crédito gerado ao cliente B2B no Simples", value: brl(creditoRepassadoSimplesB2B) },
            { label: "Custo recolhendo IBS/CBS por fora", value: brl(custoTotalOptandoPorFora) },
            {
              label: "Crédito integral gerado ao cliente B2B por fora",
              value: brl(creditoRepassadoIntegralB2B),
              destaque: true,
            },
          ]}
          nota={recomendacao}
        />
        <ExportBar
          payload={payload}
          hint="Exporte o estudo estratégico de migração do Simples Nacional."
        />
      </div>
    </CalcShell>
  );
}

function CalcImpacto() {
  const [faturamento, setFaturamento] = useState(200000);
  const [aliquotaHoje, setAliquotaHoje] = useState(18);
  const [aliquotaNova, setAliquotaNova] = useState(26.5);
  const [repassavel, setRepassavel] = useState(80);

  const impostoHoje = faturamento * (aliquotaHoje / 100);
  const impostoNovo = faturamento * (aliquotaNova / 100);
  const diferenca = impostoNovo - impostoHoje;
  const repasse = diferenca * (repassavel / 100);
  const absorvido = diferenca - repasse;

  const payload: ExportPayload = {
    nome: "nexo_tributario_impacto",
    titulo: "Nexo Tributário | Impacto no Faturamento e Repasse",
    linhas: [
      { secao: "Premissas", campo: "Faturamento mensal", valor: brl(faturamento) },
      { secao: "Premissas", campo: "Alíquota efetiva hoje", valor: `${aliquotaHoje}%` },
      { secao: "Premissas", campo: "Alíquota estimada no novo modelo", valor: `${aliquotaNova}%` },
      { secao: "Premissas", campo: "Capacidade de repasse ao preço", valor: `${repassavel}%` },
      { secao: "Resultados", campo: "Imposto hoje (mês)", valor: brl(impostoHoje) },
      { secao: "Resultados", campo: "Imposto no novo modelo (mês)", valor: brl(impostoNovo) },
      { secao: "Resultados", campo: "Variação bruta", valor: brl(diferenca) },
      { secao: "Resultados", campo: "Valor repassável ao preço", valor: brl(repasse) },
      { secao: "Resultados", campo: "Impacto absorvido na margem", valor: brl(absorvido) },
    ],
  };

  return (
    <CalcShell
      titulo="Impacto no faturamento e repasse"
      descricao="Quando a alíquota nominal muda, nem todo o valor vai para a margem: parte é repassada ao preço e parte é absorvida."
    >
      <div className="space-y-4">
        <Field label="Faturamento mensal da empresa" value={faturamento} onChange={setFaturamento} prefix="R$" step={10000} />
        <Field label="Alíquota efetiva praticada hoje" value={aliquotaHoje} onChange={setAliquotaHoje} suffix="%" />
        <Field label="Alíquota estimada no novo modelo" value={aliquotaNova} onChange={setAliquotaNova} suffix="%" step={0.5} />
        <Field label="Capacidade estimada de repasse ao preço" value={repassavel} onChange={setRepassavel} suffix="%" />
      </div>
      <div>
        <Result
          items={[
            { label: "Imposto mensal hoje", value: brl(impostoHoje) },
            { label: "Imposto no novo modelo", value: brl(impostoNovo) },
            { label: "Variação total no tributo", value: brl(diferenca) },
            { label: "Valor repassável ao preço", value: brl(repasse) },
            {
              label: "Impacto absorvido na margem",
              value: brl(absorvido),
              destaque: true,
            },
          ]}
          nota="Setores com alta concorrência têm menor poder de repasse e dependem mais do aproveitamento eficiente de créditos."
        />
        <ExportBar
          payload={payload}
          hint="Exporte as estimativas de repasse e impacto na margem."
        />
      </div>
    </CalcShell>
  );
}

function CalcAgro() {
  const [receita, setReceita] = useState(80000);
  const [insumos, setInsumos] = useState(35000);
  const [produtorPF, setProdutorPF] = useState(true);

  const limiteAnual = 3600000;
  const isento = produtorPF && receita * 12 <= limiteAnual;
  const debito = isento ? 0 : receita * 0.106;
  const creditoInsumos = isento ? 0 : insumos * 0.106;
  const creditoPresumido = isento ? receita * 0.045 : 0;

  const payload: ExportPayload = {
    nome: "nexo_tributario_agro",
    titulo: "Nexo Tributário | Produtor Rural e Crédito Presumido",
    linhas: [
      { secao: "Premissas", campo: "Receita mensal rural", valor: brl(receita) },
      { secao: "Premissas", campo: "Insumos tributados no mês", valor: brl(insumos) },
      { secao: "Premissas", campo: "Produtor PF não contribuinte", valor: produtorPF ? "Sim" : "Não" },
      {
        secao: "Resultados",
        campo: "Enquadramento",
        valor: isento ? "Fora do regime (dentro do limite anual)" : "Contribuinte regular de IBS/CBS",
      },
      { secao: "Resultados", campo: "Débito estimado no mês", valor: brl(debito) },
      { secao: "Resultados", campo: "Crédito de insumos", valor: brl(creditoInsumos) },
      {
        secao: "Resultados",
        campo: isento ? "Crédito presumido gerado ao adquirente" : "Carga líquida estimada",
        valor: brl(isento ? creditoPresumido : Math.max(debito - creditoInsumos, 0)),
      },
    ],
  };

  return (
    <CalcShell
      titulo="Agro: produtor rural e crédito presumido"
      descricao="Produtor rural pessoa física dentro do limite de receita pode ficar fora do regime, e o comprador aproveita crédito presumido. Acima do limite, entra a alíquota reduzida de alimentos com crédito de insumos."
    >
      <div className="space-y-4">
        <Field label="Receita mensal da atividade rural" value={receita} onChange={setReceita} prefix="R$" step={5000} />
        <Field label="Insumos tributados no mês" value={insumos} onChange={setInsumos} prefix="R$" step={5000} />
        <label className="flex items-center gap-3 rounded-xl bg-background/50 px-3 py-3 ring-1 ring-border">
          <input
            type="checkbox"
            checked={produtorPF}
            onChange={(e) => setProdutorPF(e.target.checked)}
            className="size-4 accent-primary"
          />
          <span className="text-sm">Produtor rural pessoa física (não contribuinte por opção)</span>
        </label>
      </div>
      <div>
        <Result
          items={[
            { label: "Receita anualizada", value: brl(receita * 12) },
            { label: "Situação", value: isento ? "Fora do regime (dentro do limite)" : "Contribuinte de IBS/CBS" },
            { label: "Débito estimado no mês", value: brl(debito) },
            { label: "Crédito de insumos", value: brl(creditoInsumos) },
            {
              label: isento ? "Crédito presumido gerado ao comprador" : "Carga líquida estimada",
              value: brl(isento ? creditoPresumido : Math.max(debito - creditoInsumos, 0)),
              destaque: true,
            },
          ]}
          nota="Limite de referência de R$ 3.600.000 ao ano; percentuais de crédito presumido ainda dependem de regulamentação complementar."
        />
        <ExportBar
          payload={payload}
          hint="Baixe os cálculos do produtor rural e créditos presumidos em PDF ou Excel."
        />
      </div>
    </CalcShell>
  );
}

const abas = [
  { id: "preco", label: "Preço Destacado", icon: Receipt, comp: CalcPreco },
  { id: "credito", label: "Crédito Integral", icon: Layers, comp: CalcCredito },
  { id: "split", label: "Split Payment & Caixa", icon: Zap, comp: CalcSplitPayment },
  { id: "cesta", label: "Cesta Básica & Seletivo", icon: ShoppingBasket, comp: CalcCestaBasica },
  { id: "regimes", label: "Diagnóstico Simples 2027+", icon: Scale, comp: CalcDiagnosticoRegimes },
  { id: "impacto", label: "Impacto no Faturamento", icon: Wallet, comp: CalcImpacto },
  { id: "agro", label: "Produtor Rural", icon: Sprout, comp: CalcAgro },
] as const;

function Ferramentas() {
  const [aba, setAba] = useState<(typeof abas)[number]["id"]>("preco");
  const Ativa = abas.find((a) => a.id === aba)!.comp;

  return (
    <div className="bg-aurora min-h-screen font-sans text-foreground">
      <SiteNav />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-12">
        <p className="text-sm font-semibold text-primary">Nexo Tributário · Calculadoras</p>
        <h1 className="mt-2 max-w-[24ch] font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-balance">
          Cálculos estratégicos, do oficial ao avançado.
        </h1>
        <p className="mt-4 max-w-[58ch] text-base sm:text-lg leading-relaxed text-muted-foreground text-pretty">
          Acesse a fonte oficial com respaldo legal, use as calculadoras rápidas para análise de impacto
          e use o simulador para comparar cenários plurianuais.
        </p>

        {/* FONTE OFICIAL E NOTÍCIAS */}
        <section className="mt-12">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-6 sm:p-8 shadow-glass md:p-10">
            <div className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-primary/15 blur-3xl" />
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
              Fonte Oficial & Notícias
            </span>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight md:text-4xl">
              Calculadora Oficial e Fontes de Notícias
            </h2>
            <p className="mt-3 max-w-[58ch] leading-relaxed text-muted-foreground text-pretty text-sm sm:text-base">
              Simule IBS e CBS na ferramenta oficial da Receita Federal (LC 214/2025) e acompanhe os desdobramentos,
              votações e análises práticas em tempo real.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://piloto-cbs.tributos.gov.br/servico/calculadora-consumo/calculadora"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_28px_var(--color-glow)]"
              >
                Abrir calculadora oficial (Receita Federal)
                <ExternalLink className="size-4" />
              </a>
              <a
                href="https://www.cnnbrasil.com.br/tudo-sobre/reforma-tributaria/"
                target="_blank"
                rel="noreferrer noopener"
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium transition-colors hover:bg-glass-strong"
              >
                Notícias em Tempo Real (CNN Brasil)
                <ExternalLink className="size-4" />
              </a>
              <a
                href="https://www.infomoney.com.br/tudo-sobre/reforma-tributaria/"
                target="_blank"
                rel="noreferrer noopener"
                className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-medium transition-colors hover:bg-glass-strong"
              >
                Análises & Mercado (InfoMoney)
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        </section>

        {/* CALCULADORAS ESTRATÉGICAS */}
        <section className="mt-8">
          <div className="glass rounded-3xl p-6 sm:p-8 shadow-glass md:p-10">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
              Estimativas Rápidas
            </span>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight md:text-4xl">
              Calculadoras Estratégicas
            </h2>
            <p className="mt-3 max-w-[58ch] leading-relaxed text-muted-foreground text-pretty text-sm sm:text-base">
              Sete ferramentas didáticas para enxergar a mecânica do IVA dual, split payment, cesta básica e
              diagnóstico tributário em segundos.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {abas.map((a) => {
                const ativo = a.id === aba;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAba(a.id)}
                    className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-xs sm:text-sm font-medium transition-all ${ativo
                        ? "bg-primary text-primary-foreground shadow-[0_0_20px_var(--color-glow)]"
                        : "glass text-muted-foreground hover:bg-glass-strong hover:text-foreground"
                      }`}
                  >
                    <a.icon className="size-3.5 sm:size-4" />
                    {a.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-8 rounded-3xl bg-background/30 p-5 sm:p-7 ring-1 ring-border md:p-8">
              <Ativa />
            </div>
          </div>
        </section>

        {/* SIMULADORES ESTRATÉGICOS */}
        <section className="mt-12 mb-12">
          <div className="glass grid gap-8 rounded-3xl p-6 sm:p-8 shadow-glass ring-1 ring-primary/20 md:grid-cols-[1.2fr_1fr] md:p-10">
            <div>
              <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-primary uppercase">
                Para Empresas
              </span>
              <h2 className="mt-4 font-display text-2xl sm:text-3xl font-semibold tracking-tight md:text-4xl">
                Simulador Plurianual Avançado
              </h2>
              <p className="mt-3 max-w-[52ch] leading-relaxed text-muted-foreground text-pretty text-sm sm:text-base">
                Projete três cenários lado a lado: modelo atual, cada ano da transição e o modelo
                pleno de 2033, com receita, insumos, mix de regimes e cumulatividade da sua operação.
              </p>
              <Link
                to="/simulador"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:shadow-[0_0_28px_var(--color-glow)]"
              >
                Abrir simuladores avançados
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <ul className="space-y-3">
              {[
                { icon: Calculator, t: "Atual × transição × novo modelo (2026-2033)" },
                { icon: Building2, t: "Mix de alíquotas por linha de receita" },
                { icon: Layers, t: "Efeito do crédito financeiro no caixa" },
                { icon: Sprout, t: "Classificação fiscal NCM e Anexo IX da LC 214" },
              ].map((i) => (
                <li key={i.t} className="flex items-center gap-3 rounded-2xl bg-background/40 px-4 py-3.5 ring-1 ring-border">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
                    <i.icon className="size-4" />
                  </span>
                  <span className="text-sm">{i.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
