// Catálogo e motor de classificação fiscal de produtos do Agronegócio e Cooperativismo Cooxupé
// Enquadramento: Sociedade Cooperativa de Produção Agropecuária (LC 214/2025 Art. 271 e Art. 138 / Dec. 12.955/2026)
import rawProdutosCatalog from "./produtos-catalog.json";

export type PerfilComprador = "cooperado_regular" | "cooperado_nao_regular" | "terceiro_mercado";

export type RegraTributariaAgro = {
  categoria: string;
  descricao: string;
  anexoIX: boolean;
  descricaoAnexoIX: string;
  aliquotaReforma: number; // Alíquota padrão / mercado
  regimeReforma: string;
  aliquotaTexto: string;
  modeloAtual: string;
  reformaImpacto: string;
  atoCooperativo: string;
  regraMGSP: string;
  tipoCredito: string;

  // Regras específicas por perfil de adquirente (Apoio ao Analista de Mercado)
  aliquotaCooperadoRegular: number;
  regraCooperadoRegular: string;
  aliquotaCooperadoNaoRegular: number;
  regraCooperadoNaoRegular: string;
  aliquotaMercadoTerceiros: number;
  regraMercadoTerceiros: string;
  statusDiferimento: string;
  cstSugerido: string;
  artigoLC214: string;
  decreto12955: string;
};

export const REGRAS_AGRO: (RegraTributariaAgro & { prefixos: string[] })[] = [
  {
    prefixos: ["3101", "3102", "3103", "3104", "3105", "31"],
    categoria: "Fertilizantes & Adubos",
    descricao: "Adubos químicos, minerais, fórmulas NPK, ureia, nitratos, fosfatados e organominerais para lavouras de café, soja e milho.",
    anexoIX: true,
    descricaoAnexoIX: "Insumo Agropecuário contemplado expressamente no Anexo IX da LC 214/2025 (Capítulo 31).",
    aliquotaReforma: 0.106,
    regimeReforma: "Redução de 60% (Insumo Agropecuário Essencial - Anexo IX)",
    aliquotaTexto: "10,6%",
    modeloAtual: "Convênio ICMS 100/97 (alíquota efetiva de 1% a 4% no ICMS) e PIS/COFINS com alíquota zero (Lei 10.925/2004).",
    reformaImpacto: "Na venda ao mercado, imposto recolhido por fora (10,6%). Nas vendas a cooperados no regime regular, aplica-se IBS/CBS a 0% pelo Ato Cooperativo.",
    atoCooperativo: "Ato cooperativo pleno (Art. 271, II da LC 214/2025): fornecimento da Cooxupé ao associado sujeito ao regime regular possui alíquota zero de IBS e CBS.",
    regraMGSP: "Operações entre filiais e lojas em MG e SP seguem o Princípio do Destino com alíquota unificada pelo IBS, extinguindo o DIFAL e a guerra fiscal interestadual.",
    tipoCredito: "Crédito financeiro integral e imediato na apuração",

    aliquotaCooperadoRegular: 0.0,
    regraCooperadoRegular: "IBS 0% / CBS 0% (Alíquota Zero - Art. 271, II da LC 214/2025)",
    aliquotaCooperadoNaoRegular: 0.0,
    regraCooperadoNaoRegular: "Diferimento de IBS/CBS (Art. 138, §2º e §3º da LC 214/2025) - Recolhimento postergado",
    aliquotaMercadoTerceiros: 0.106,
    regraMercadoTerceiros: "Redução de 60% das alíquotas (IBS/CBS 10,6%) com crédito integral",
    statusDiferimento: "Aplicável na venda a produtor rural não regular (Art. 138, §2º)",
    cstSugerido: "CST 01 / CST 51 (Ato Cooperativo / Diferimento Insumos)",
    artigoLC214: "Art. 271, II e Art. 138, §2º / Anexo IX da LC nº 214/2025",
    decreto12955: "Art. 14 do Decreto nº 12.955/2026 (Regulamentação CBS para Cooperativas)",
  },
  {
    prefixos: ["38089995", "3808999", "300249", "30029000", "38210000"],
    categoria: "Bioinsumos & Defensivos Biológicos",
    descricao: "Inoculantes (Rizofos, Nuello Azo, Masterfix), agentes biológicos certificados, nematicidas biológicos e microrganismos de uso agrícola.",
    anexoIX: true,
    descricaoAnexoIX: "Insumo Biológico com benefício prioritário no Anexo IX da LC 214/2025.",
    aliquotaReforma: 0.0,
    regimeReforma: "Incentivo à Transição Ecológica (Alíquota Zero de IBS/CBS)",
    aliquotaTexto: "0,0%",
    modeloAtual: "Convênio ICMS 100/97 (redução de base) e PIS/COFINS com alíquota zero.",
    reformaImpacto: "Bioinsumos e controle biológico recebem desoneração total de 100% (alíquota zero) em toda a cadeia com manutenção integral de créditos.",
    atoCooperativo: "Neutralidade tributária absoluta com repasse a preço cooperado e zero imposto faturado.",
    regraMGSP: "Livre circulação interestadual entre armazéns e lojas de MG e SP sem retenções tributárias.",
    tipoCredito: "Manutenção integral dos créditos da cadeia",

    aliquotaCooperadoRegular: 0.0,
    regraCooperadoRegular: "IBS 0% / CBS 0% (Art. 271, II da LC 214/2025 e Alíquota Zero Ecológica)",
    aliquotaCooperadoNaoRegular: 0.0,
    regraCooperadoNaoRegular: "IBS 0% / CBS 0% (Alíquota Zero Nacional para Bioinsumos)",
    aliquotaMercadoTerceiros: 0.0,
    regraMercadoTerceiros: "IBS 0% / CBS 0% (Desoneração Total - Bioinsumos)",
    statusDiferimento: "Dispensado por se tratar de alíquota zero plena",
    cstSugerido: "CST 06 (Alíquota Zero Bioinsumos)",
    artigoLC214: "Art. 138, §1º e Art. 271 da LC nº 214/2025",
    decreto12955: "Decreto nº 12.955/2026",
  },
  {
    prefixos: ["38089299", "38089329", "380891", "380892", "380893", "3808"],
    categoria: "Defensivos Químicos Agrícolas",
    descricao: "Fungicidas (Opera, Flint, Sphere, Priori), inseticidas, herbicidas químicos e adjuvantes registrados para cafeicultura e lavouras de grãos.",
    anexoIX: true,
    descricaoAnexoIX: "Insumo Agropecuário enquadrado expressamente no Anexo IX da LC 214/2025 (Capítulo 38.08).",
    aliquotaReforma: 0.106,
    regimeReforma: "Redução de 60% (Insumo Agropecuário - Anexo IX)",
    aliquotaTexto: "10,6%",
    modeloAtual: "Convênio ICMS 100/97 e PIS/COFINS com alíquota zero (Lei 10.925/2004).",
    reformaImpacto: "Venda a cooperado regular é 0% pelo Ato Cooperativo (Art. 271, II). Venda a terceiros recolhe 10,6% por fora com crédito financeiro integral.",
    atoCooperativo: "Aquisições conjuntas e repasse ao associado regular com IBS e CBS à alíquota zero conforme o Art. 271, II.",
    regraMGSP: "Vendas e transferências entre lojas de MG (ex: Guaxupé, Varginha, Alfenas) e SP (ex: Franca, Caconde, Espírito Santo do Pinhal) sem barreiras interestaduais.",
    tipoCredito: "Crédito integral na aquisição / Repasse cooperativo",

    aliquotaCooperadoRegular: 0.0,
    regraCooperadoRegular: "IBS 0% / CBS 0% (Alíquota Zero do Ato Cooperativo - Art. 271, II)",
    aliquotaCooperadoNaoRegular: 0.0,
    regraCooperadoNaoRegular: "Diferimento de IBS/CBS (Art. 138, §2º e §3º da LC 214/2025)",
    aliquotaMercadoTerceiros: 0.106,
    regraMercadoTerceiros: "Redução de 60% das alíquotas (IBS/CBS 10,6%)",
    statusDiferimento: "Aplicável na venda a produtor rural não regular (Art. 138, §2º)",
    cstSugerido: "CST 01 / CST 51 (Ato Cooperativo / Diferimento)",
    artigoLC214: "Art. 271, II e Art. 138 / Anexo IX da LC nº 214/2025",
    decreto12955: "Art. 14 do Decreto nº 12.955/2026",
  },
  {
    prefixos: ["8433", "8419", "8432", "8436", "8424", "8428", "8429", "8467", "8701", "8716", "84", "87"],
    categoria: "Máquinas, Tratores & Equipamentos",
    descricao: "Secadores de café (Palini Alves), despolpadores, abanadores, adubadoras Vicon, sistemas de irrigação e tratores agrícolas Tramontini.",
    anexoIX: false,
    descricaoAnexoIX: "Não integra o Anexo IX de insumos, mas se beneficia do regime de Bens de Capital e do Ato Cooperativo (Art. 271).",
    aliquotaReforma: 0.265,
    regimeReforma: "Bens de Capital com Crédito Imediato (Apropriação em 1 mês em vez de 48 meses CIAP)",
    aliquotaTexto: "26,5% (Mercado) / 0% (Cooperado Regular)",
    modeloAtual: "Convênio ICMS 52/91 (base reduzida) + IPI. Crédito de ICMS retido e devolvido lentamente em 48 parcelas mensais (CIAP).",
    reformaImpacto: "A venda pela Cooxupé ao cooperado regular goza de IBS/CBS 0% (Art. 271, II). Venda a terceiros tem crédito imediato sem trava de 48 meses.",
    atoCooperativo: "No fornecimento de bem material ao associado regular, aplica-se a alíquota zero do Art. 271, II da LC 214/2025.",
    regraMGSP: "Mesma alíquota independente se a máquina foi faturada de fábrica em SP ou concessionária em MG.",
    tipoCredito: "Crédito financeiro imediato (100% no mês da compra - Fim do CIAP)",

    aliquotaCooperadoRegular: 0.0,
    regraCooperadoRegular: "IBS 0% / CBS 0% (Art. 271, II da LC 214/2025 - Fornecimento ao Cooperado Regular)",
    aliquotaCooperadoNaoRegular: 0.265,
    regraCooperadoNaoRegular: "Tributação normal com anulação de créditos da cooperativa (Art. 271, §1º, II)",
    aliquotaMercadoTerceiros: 0.265,
    regraMercadoTerceiros: "Alíquota Padrão 26,5% (Crédito Integral no Mês da Compra)",
    statusDiferimento: "Não se aplica diferimento (Não integra Anexo IX)",
    cstSugerido: "CST 01 (Cooperado Regular) / CST 00 (Mercado Geral)",
    artigoLC214: "Art. 271, II e §1º, II da LC nº 214/2025",
    decreto12955: "Decreto nº 12.955/2026",
  },
  {
    prefixos: ["7309", "7308", "7318", "73"],
    categoria: "Silos Metálicos & Estruturas de Armazenagem",
    descricao: "Conjuntos metálicos para armazenagem de café/cereais Palini, estruturas para tulhas, silos graneleiros e componentes estruturais.",
    anexoIX: false,
    descricaoAnexoIX: "Infraestrutura e Bens de Capital para pós-colheita.",
    aliquotaReforma: 0.265,
    regimeReforma: "Bens de Capital e Infraestrutura com Crédito Amplo",
    aliquotaTexto: "26,5% (Mercado) / 0% (Cooperado Regular)",
    modeloAtual: "Tributação normal de ICMS/IPI com crédito restrito e sujeito a estornos.",
    reformaImpacto: "Investimento em armazenagem gera crédito financeiro total de IBS/CBS, desonerando a infraestrutura de café e grãos.",
    atoCooperativo: "Fornecimento ao cooperado regular com alíquota zero pelo Art. 271, II da LC 214/2025.",
    regraMGSP: "Alíquota arrecadada no destino onde o silo ou tulha é instalado.",
    tipoCredito: "Crédito integral sobre o investimento",

    aliquotaCooperadoRegular: 0.0,
    regraCooperadoRegular: "IBS 0% / CBS 0% (Art. 271, II da LC 214/2025)",
    aliquotaCooperadoNaoRegular: 0.265,
    regraCooperadoNaoRegular: "Regime Geral com anulação de créditos (Art. 271, §1º, II)",
    aliquotaMercadoTerceiros: 0.265,
    regraMercadoTerceiros: "Alíquota Padrão 26,5% com crédito amplo",
    statusDiferimento: "Não se aplica diferimento",
    cstSugerido: "CST 01 (Cooperado Regular) / CST 00 (Mercado)",
    artigoLC214: "Art. 271 da LC nº 214/2025",
    decreto12955: "Decreto nº 12.955/2026",
  },
  {
    prefixos: ["1005", "1201", "0901", "12", "10", "09"],
    categoria: "Sementes, Grãos & Café",
    descricao: "Sementes fiscalizadas de milho SHULL, soja, forrageiras e café em grão verde/beneficiado para comercialização e exportação.",
    anexoIX: true,
    descricaoAnexoIX: "Insumo e Produto Agropecuário contemplado no Anexo IX (Capítulos 10 e 12).",
    aliquotaReforma: 0.106,
    regimeReforma: "Alíquota Zero na Exportação / Redução de 60% no Mercado Interno",
    aliquotaTexto: "0% a 10,6%",
    modeloAtual: "Isenção de ICMS na semente (Convênio 100/97) e não incidência na exportação de café com acúmulo de créditos.",
    reformaImpacto: "Exportação de café mantém imunidade (0%) com devolução rápida e garantida dos créditos de insumos pelo Comitê Gestor.",
    atoCooperativo: "Ato cooperativo pleno na entrega da produção pelo cooperado para beneficiamento e na venda de sementes aos associados.",
    regraMGSP: "Fluxo interestadual unificado no Comitê Gestor sem retenção de créditos entre os estados.",
    tipoCredito: "Ressarcimento ágil de créditos na exportação",

    aliquotaCooperadoRegular: 0.0,
    regraCooperadoRegular: "IBS 0% / CBS 0% (Ato Cooperativo - Art. 271, II da LC 214/2025)",
    aliquotaCooperadoNaoRegular: 0.0,
    regraCooperadoNaoRegular: "Diferimento / Regime Específico de Sementes (Art. 138 da LC 214/2025)",
    aliquotaMercadoTerceiros: 0.106,
    regraMercadoTerceiros: "Redução de 60% (Mercado Interno) / Alíquota 0% (Exportação)",
    statusDiferimento: "Aplicável para produção agropecuária",
    cstSugerido: "CST 01 / CST 08 (Exportação Imune)",
    artigoLC214: "Art. 271, II e Art. 138 da LC nº 214/2025",
    decreto12955: "Decreto nº 12.955/2026",
  },
  {
    prefixos: ["2309", "2304", "23"],
    categoria: "Rações, Concentrados & Nutrição Animal",
    descricao: "Rações balanceadas, concentrados, suplementos minerais, premix e núcleos para nutrição animal de rebanhos leiteiros e de corte.",
    anexoIX: true,
    descricaoAnexoIX: "Insumo Agropecuário contemplado no Anexo IX da LC 214/2025 (Capítulo 2309.90).",
    aliquotaReforma: 0.106,
    regimeReforma: "Redução de 60% (Insumo Agropecuário - Anexo IX)",
    aliquotaTexto: "10,6%",
    modeloAtual: "Convênio 100/97 (redução de ICMS) e PIS/COFINS zero.",
    reformaImpacto: "Fornecimento ao cooperado regular tem alíquota zero (Art. 271, II). Venda a terceiros tem 10,6% com crédito financeiro integral.",
    atoCooperativo: "Produção nas fábricas de rações da Cooxupé entregue a preço de custo aos associados com alíquota zero de IBS/CBS.",
    regraMGSP: "Distribuição direta aos cooperados em MG e SP sem bitributação.",
    tipoCredito: "Crédito integral",

    aliquotaCooperadoRegular: 0.0,
    regraCooperadoRegular: "IBS 0% / CBS 0% (Art. 271, II da LC 214/2025)",
    aliquotaCooperadoNaoRegular: 0.0,
    regraCooperadoNaoRegular: "Diferimento de IBS/CBS (Art. 138, §2º da LC 214/2025)",
    aliquotaMercadoTerceiros: 0.106,
    regraMercadoTerceiros: "Redução de 60% das alíquotas (IBS/CBS 10,6%)",
    statusDiferimento: "Aplicável na nutrição animal para produtores",
    cstSugerido: "CST 01 / CST 51",
    artigoLC214: "Art. 271, II e Art. 138 / Anexo IX da LC nº 214/2025",
    decreto12955: "Decreto nº 12.955/2026",
  },
  {
    prefixos: ["4010", "4011", "8201", "8202", "8203", "8501", "3917", "40", "82", "85", "39", "27", "30"],
    categoria: "Peças, Ferramentas, Tubulações & Outros Insumos",
    descricao: "Correias industriais, pneus agrícolas, motores elétricos, ferramentas de poda/colheita, mangueiras de irrigação e peças de reposição.",
    anexoIX: false,
    descricaoAnexoIX: "Produtos gerais fora do Anexo IX (sujeitos ao regime comum ou Art. 271 se no objetivo social).",
    aliquotaReforma: 0.265,
    regimeReforma: "Regime Geral com Crédito Amplo Não Cumulativo",
    aliquotaTexto: "26,5%",
    modeloAtual: "ICMS integral com substituição tributária (ST) e restrições de crédito para uso e consumo.",
    reformaImpacto: "Extinção da Substituição Tributária (ST). Todo insumo ou peça comprado pela cooperativa gera crédito financeiro aproveitável.",
    atoCooperativo: "Fornecimento ao cooperado regular dentro do escopo com IBS/CBS 0% (Art. 271, II).",
    regraMGSP: "Fim do recolhimento antecipado de ST nas divisas de MG e SP.",
    tipoCredito: "Crédito integral imediato",

    aliquotaCooperadoRegular: 0.0,
    regraCooperadoRegular: "IBS 0% / CBS 0% (Art. 271, II da LC 214/2025, se abrangido no objetivo)",
    aliquotaCooperadoNaoRegular: 0.265,
    regraCooperadoNaoRegular: "Tributação normal 26,5% com anulação de créditos da cooperativa",
    aliquotaMercadoTerceiros: 0.265,
    regraMercadoTerceiros: "Alíquota Padrão 26,5% (Crédito Integral)",
    statusDiferimento: "Não se aplica diferimento",
    cstSugerido: "CST 01 (Cooperado) / CST 00 (Mercado)",
    artigoLC214: "Art. 271 da LC nº 214/2025",
    decreto12955: "Decreto nº 12.955/2026",
  },
];

export type ProdutoAgro = {
  codigo: string;
  nome: string;
  ncm: string;
  ncmFormatado: string;
  ncmBruto?: string;
  categoriaSugerida: string;
  fabricante?: string | undefined;
  anexoIX: boolean;
};

type RawProdutoJson = {
  c: string;
  n: string;
  m: string;
  f: string;
  b?: string;
  a: number;
  fab?: string;
};

// Conversão do catálogo completo de 30.225 produtos da Cooxupé
export const CATALOGO_PRODUTOS_COMPLETO: ProdutoAgro[] = (rawProdutosCatalog as RawProdutoJson[]).map(
  (item) => {
    const regra = identificarRegraNCM(item.m || item.c);
    return {
      codigo: item.c,
      nome: item.n,
      ncm: item.m,
      ncmFormatado: item.f,
      ncmBruto: item.b || item.m,
      categoriaSugerida: regra.categoria,
      fabricante: item.fab,
      anexoIX: item.a === 1,
    };
  }
);

// Mapas de indexação para busca em O(1)
const SKU_MAP = new Map<string, ProdutoAgro>();
const NCM_MAP = new Map<string, ProdutoAgro[]>();

for (const p of CATALOGO_PRODUTOS_COMPLETO) {
  SKU_MAP.set(p.codigo.toLowerCase(), p);
  const ncmKey = p.ncm.replace(/[^0-9]/g, "");
  if (!NCM_MAP.has(ncmKey)) {
    NCM_MAP.set(ncmKey, []);
  }
  NCM_MAP.get(ncmKey)!.push(p);
}

// Exemplos representativos rápidos
export const PRODUTOS_AGRO_EXEMPLO: ProdutoAgro[] = CATALOGO_PRODUTOS_COMPLETO.slice(0, 30);

/* ==========================================================================
   FUNÇÕES DE BUSCA DE ALTA PERFORMANCE
   ========================================================================== */

export function buscarPorSku(termo: string, limite = 15): ProdutoAgro[] {
  if (!termo || !termo.trim()) return [];
  const t = termo.trim().toLowerCase();

  // Match exato primeiro
  const exato = SKU_MAP.get(t);
  const resultados: ProdutoAgro[] = [];
  if (exato) resultados.push(exato);

  for (const p of CATALOGO_PRODUTOS_COMPLETO) {
    if (resultados.length >= limite) break;
    if (p.codigo.toLowerCase().startsWith(t) && p !== exato) {
      resultados.push(p);
    }
  }
  return resultados;
}

export function buscarPorNome(termo: string, limite = 15): ProdutoAgro[] {
  if (!termo || !termo.trim()) return [];
  const tokens = termo.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return [];

  const resultados: ProdutoAgro[] = [];
  for (const p of CATALOGO_PRODUTOS_COMPLETO) {
    if (resultados.length >= limite) break;
    const nome = p.nome.toLowerCase();
    const fab = p.fabricante ? p.fabricante.toLowerCase() : "";
    const sku = p.codigo.toLowerCase();

    // Todos os tokens digitados precisam casar
    const match = tokens.every(
      (tok) => nome.includes(tok) || fab.includes(tok) || sku.includes(tok)
    );
    if (match) {
      resultados.push(p);
    }
  }
  return resultados;
}

export function buscarPorNcm(ncmInput: string, limite = 15): ProdutoAgro[] {
  if (!ncmInput || !ncmInput.trim()) return [];
  const limpo = ncmInput.replace(/[^0-9]/g, "");
  if (!limpo) return [];

  // Busca na lista de NCMs exatos
  const exatos = NCM_MAP.get(limpo);
  if (exatos && exatos.length > 0) {
    return exatos.slice(0, limite);
  }

  // Busca por prefixo
  const resultados: ProdutoAgro[] = [];
  for (const p of CATALOGO_PRODUTOS_COMPLETO) {
    if (resultados.length >= limite) break;
    if (p.ncm.startsWith(limpo) || (p.ncmBruto && p.ncmBruto.replace(/[^0-9]/g, "").startsWith(limpo))) {
      resultados.push(p);
    }
  }
  return resultados;
}

export type ValidacaoNCM = {
  valido: boolean;
  motivo?: string;
  ncmLimpo: string;
  capitulo: string;
  encontradoNaBase: boolean;
  categoriaIdentificada?: string;
};

// Capítulos NCM oficiais e reconhecidos aplicáveis ao Agronegócio, Bens de Capital e Insumos
const CAPITULOS_VALIDOS_AGRO: Record<string, string> = {
  "09": "Café, chá, mate e especiarias (Café Verde / Beneficiado)",
  "10": "Cereais (Milho, trigo, arroz e sementes)",
  "12": "Sementes e frutos oleaginosos (Soja e forrageiras)",
  "23": "Resíduos das indústrias alimentares; Rações balanceadas",
  "27": "Combustíveis minerais e óleos agrícolas",
  "30": "Produtos farmacêuticos, vacinas veterinárias e inoculantes",
  "31": "Adubos ou fertilizantes (NPK, Ureia, Nitratos, Organominerais)",
  "38": "Defensivos químicos, fungicidas, inseticidas e bioinsumos",
  "39": "Plásticos e suas obras (Mangueiras e tubos de irrigação)",
  "40": "Borracha e suas obras (Correias e pneus agrícolas)",
  "73": "Obras de ferro fundido, ferro ou aço (Silos, tulhas e estruturas)",
  "82": "Ferramentas manuais, lâminas de poda e colheita",
  "84": "Máquinas agrícolas, secadores, despolpadores e tratores",
  "85": "Motores elétricos e equipamentos de eletrificação rural",
  "87": "Tratores agrícolas, reboques e transportadores de café",
};

export function validarNCM(ncmInput: string): ValidacaoNCM {
  const ncmLimpo = ncmInput.replace(/[^0-9]/g, "");
  if (!ncmLimpo) {
    return {
      valido: false,
      motivo: "Informe o código NCM numérico de 8 dígitos.",
      ncmLimpo: "",
      capitulo: "",
      encontradoNaBase: false,
    };
  }

  if (ncmLimpo.length < 4) {
    return {
      valido: false,
      motivo: "O código NCM deve possuir no mínimo 4 dígitos (ex: 3105 para Fertilizantes ou 3808 para Defensivos).",
      ncmLimpo,
      capitulo: ncmLimpo.slice(0, 2),
      encontradoNaBase: false,
    };
  }

  const capitulo = ncmLimpo.slice(0, 2);
  const capNum = parseInt(capitulo, 10);

  // Se o capítulo não é numérico ou está fora do intervalo SH (01 a 97) ou é 77 (inexistente)
  if (isNaN(capNum) || capNum < 1 || capNum > 97 || capNum === 77) {
    return {
      valido: false,
      motivo: `O Capítulo "${capitulo}" não existe na Nomenclatura Comum do Mercosul (NCM/SH). O código digitado (${ncmInput}) é inválido.`,
      ncmLimpo,
      capitulo,
      encontradoNaBase: false,
    };
  }

  // Verifica se o capítulo pertence ao escopo de agro, bens de capital e insumos
  const descricaoCapitulo = CAPITULOS_VALIDOS_AGRO[capitulo];
  if (!descricaoCapitulo) {
    return {
      valido: false,
      motivo: `O Capítulo "${capitulo}" (NCM: ${ncmInput}) não pertence aos grupos de insumos, máquinas, defensivos ou matérias agropecuárias da LC 214/2025.`,
      ncmLimpo,
      capitulo,
      encontradoNaBase: false,
    };
  }

  // Verifica se temos regra tributária mapeada
  const regra = identificarRegraNCM(ncmLimpo);

  return {
    valido: true,
    ncmLimpo,
    capitulo,
    encontradoNaBase: true,
    categoriaIdentificada: regra.categoria,
  };
}

export function identificarRegraNCM(ncmInput: string): RegraTributariaAgro {
  const limpo = ncmInput.replace(/[^0-9]/g, "");
  for (const r of REGRAS_AGRO) {
    if (r.prefixos.some((p) => limpo.startsWith(p))) {
      return r;
    }
  }
  return REGRAS_AGRO[REGRAS_AGRO.length - 1]!;
}

export type ResultadoCotacaoAnalista = {
  aliquotaEfetiva: number;
  aliquotaTexto: string;
  regraAplicada: string;
  impostoDestacado: number;
  cbsFederal: number;
  ibsSubnacional: number;
  precoFinal: number;
  creditoApropriavel: number;
  diferimentoAtivo: boolean;
  fundamentacaoLegal: string;
};

export function calcularCotacaoAnalista(params: {
  valorMercadoria: number;
  regra: RegraTributariaAgro;
  perfil: PerfilComprador;
}): ResultadoCotacaoAnalista {
  const { valorMercadoria, regra, perfil } = params;

  let aliquota = 0;
  let regraTexto = "";
  let diferimento = false;
  let fundamentacao = "";

  if (perfil === "cooperado_regular") {
    aliquota = regra.aliquotaCooperadoRegular;
    regraTexto = regra.regraCooperadoRegular;
    fundamentacao = "Art. 271, II da LC nº 214/2025 (Regime Específico das Cooperativas - Alíquota Zero)";
  } else if (perfil === "cooperado_nao_regular") {
    if (regra.anexoIX && regra.categoria !== "Bioinsumos & Defensivos Biológicos") {
      aliquota = 0;
      diferimento = true;
      regraTexto = "Diferimento de IBS/CBS (Art. 138, §2º / §3º da LC 214/2025)";
      fundamentacao = "Art. 138, §2º e §3º da LC nº 214/2025 (Insumo do Anexo IX com diferimento para produtor não regular)";
    } else if (regra.categoria === "Bioinsumos & Defensivos Biológicos") {
      aliquota = 0;
      regraTexto = "IBS 0% / CBS 0% (Alíquota Zero Nacional para Bioinsumos)";
      fundamentacao = "Art. 138, §1º da LC nº 214/2025";
    } else {
      aliquota = regra.aliquotaCooperadoNaoRegular;
      regraTexto = regra.regraCooperadoNaoRegular;
      fundamentacao = "Art. 271, §1º, II da LC nº 214/2025 (Fornecimento a associado não regular com anulação de créditos)";
    }
  } else {
    // terceiro_mercado
    aliquota = regra.aliquotaMercadoTerceiros;
    regraTexto = regra.regraMercadoTerceiros;
    fundamentacao = regra.anexoIX
      ? "Art. 138 da LC nº 214/2025 (Insumos Agropecuários - Anexo IX)"
      : "Art. 156-A da CF / EC 132/2023 (Regime Geral de Bens e Mercadorias)";
  }

  const imposto = valorMercadoria * aliquota;
  // Divisão CBS (32,5% do imposto) e IBS (67,5% do imposto)
  const cbs = aliquota > 0 ? imposto * (0.0865 / 0.265) : 0;
  const ibs = aliquota > 0 ? imposto - cbs : 0;
  const credito = imposto;

  const aliquotaFormatada = diferimento
    ? "0,0% (Diferido)"
    : `${(aliquota * 100).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

  return {
    aliquotaEfetiva: aliquota,
    aliquotaTexto: aliquotaFormatada,
    regraAplicada: regraTexto,
    impostoDestacado: imposto,
    cbsFederal: cbs,
    ibsSubnacional: ibs,
    precoFinal: valorMercadoria + imposto,
    creditoApropriavel: credito,
    diferimentoAtivo: diferimento,
    fundamentacaoLegal: fundamentacao,
  };
}
