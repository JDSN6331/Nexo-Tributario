// Parâmetros simplificados de referência (fins educativos).
export const ALIQUOTA_REFERENCIA = 0.265; // CBS + IBS estimada
export const CBS = 0.0865;
export const IBS = 0.1785;

export const REGIMES = [
  { id: "padrao", label: "Padrão (26,5%)", aliquota: 0.265 },
  { id: "reduzida60", label: "Redução de 60% (saúde, educação, transporte)", aliquota: 0.106 },
  { id: "reduzida30", label: "Redução de 30% (profissões regulamentadas)", aliquota: 0.1855 },
  { id: "cesta", label: "Cesta básica nacional (alíquota zero)", aliquota: 0 },
] as const;

// Fases da transição: peso do modelo novo x modelo antigo (EC 132/2023 e LC 214/2025)
export const FASES = [
  { ano: "2026", novo: 0, antigo: 1, nota: "Ano-teste: 0,9% CBS + 0,1% IBS compensáveis com PIS/COFINS (sem carga adicional)." },
  { ano: "2027", novo: 0.326, antigo: 0.674, nota: "Vigência plena da CBS (8,65%); extinção de PIS/COFINS; ICMS e ISS mantidos integrais." },
  { ano: "2028", novo: 0.326, antigo: 0.674, nota: "Consolidação da CBS e ajustes no Comitê Gestor do IBS; ICMS/ISS ainda integrais." },
  { ano: "2029", novo: 0.394, antigo: 0.606, nota: "Início da transição do IBS: redução de 10% do ICMS/ISS e entrada de 10% do IBS (1,785%)." },
  { ano: "2030", novo: 0.461, antigo: 0.539, nota: "Redução de 20% do ICMS/ISS; IBS sobe para 20% da alíquota de referência (3,57%)." },
  { ano: "2031", novo: 0.528, antigo: 0.472, nota: "Redução de 30% do ICMS/ISS; IBS sobe para 30% da alíquota de referência (5,355%)." },
  { ano: "2032", novo: 0.596, antigo: 0.404, nota: "Redução de 40% do ICMS/ISS; IBS sobe para 40% da alíquota de referência (7,14%)." },
  { ano: "2033", novo: 1, antigo: 0, nota: "Modelo novo pleno: 100% CBS e IBS; extinção definitiva de ICMS, ISS e IPI." },
] as const;

export const brl = (v: number) =>
  (Number.isFinite(v) ? v : 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export const pct = (v: number) =>
  `${(v * 100).toLocaleString("pt-BR", { maximumFractionDigits: 2 })}%`;

/** Imposto "por dentro" (modelo atual) → equivalente "por fora" (IVA). */
export function porDentro(preco: number, aliquota: number) {
  const imposto = preco * aliquota;
  return { imposto, base: preco - imposto };
}

export function porFora(base: number, aliquota: number) {
  const imposto = base * aliquota;
  return { imposto, total: base + imposto };
}

/** Crédito financeiro: o que foi pago nas compras vira crédito integral. */
export function creditoNaoCumulativo(params: {
  receita: number;
  comprasComCredito: number;
  aliquota: number;
  cumulatividadeAtual: number; // % das compras que hoje NÃO gera crédito
}) {
  const { receita, comprasComCredito, aliquota, cumulatividadeAtual } = params;
  const debito = receita * aliquota;
  const creditoNovo = comprasComCredito * aliquota;
  const creditoAtual = creditoNovo * (1 - cumulatividadeAtual);
  const aPagarNovo = Math.max(debito - creditoNovo, 0);
  const aPagarAtual = Math.max(debito - creditoAtual, 0);
  return {
    debito,
    creditoNovo,
    creditoAtual,
    aPagarNovo,
    aPagarAtual,
    /** Aliases usados pelas calculadoras visuais */
    impostoNovo: aPagarNovo,
    impostoAtual: aPagarAtual,
    ganhoCredito: aPagarAtual - aPagarNovo,
  };
}
