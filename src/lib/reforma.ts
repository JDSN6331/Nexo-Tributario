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

// Fases da transição: peso do modelo novo x modelo antigo
export const FASES = [
  { ano: "2026", novo: 0.01, antigo: 1, nota: "Ano-teste: 0,9% CBS + 0,1% IBS, compensáveis." },
  { ano: "2027", novo: 0.9, antigo: 0.35, nota: "CBS substitui PIS/COFINS; IPI zerado na maioria dos casos." },
  { ano: "2029", novo: 0.95, antigo: 0.28, nota: "ICMS/ISS começam a cair 10% ao ano; IBS sobe na mesma proporção." },
  { ano: "2031", novo: 0.98, antigo: 0.14, nota: "ICMS/ISS reduzidos a 40% do valor original." },
  { ano: "2033", novo: 1, antigo: 0, nota: "Modelo novo integral: apenas CBS e IBS." },
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
  return {
    debito,
    creditoNovo,
    creditoAtual,
    aPagarNovo: Math.max(debito - creditoNovo, 0),
    aPagarAtual: Math.max(debito - creditoAtual, 0),
  };
}
