/** Dados centralizados do Radar de Mudanças, Prazos e Changelog do Clareza Fiscal. */

export type PublicoTipo = "Empresas" | "MEI e Simples" | "Consumidor" | "Agronegócio" | "Todos";

export type CategoriaTipo =
  | "ERP & Sistemas"
  | "Nota Fiscal & Emissão"
  | "Preços & Margens"
  | "Crédito & Caixa"
  | "Jurídico & Contratos"
  | "Regulamentação & Leis"
  | "Social & Consumo"
  | "Agro";

export type ItemRadar = {
  id: string;
  titulo: string;
  detalhe: string;
  data: string;
  prazoAno?: number;
  tags: string[];
  publico: PublicoTipo;
  categoria: CategoriaTipo;
  urgencia: "alta" | "media" | "informativa";
};

export const ULTIMA_ATUALIZACAO_RADAR = "29 de Agosto de 2026";

export const COLUNAS_RADAR: {
  id: "mudou" | "breve" | "pendente" | "fazer";
  titulo: string;
  subtitulo: string;
  tom: string;
  itens: ItemRadar[];
}[] = [
  {
    id: "mudou",
    titulo: "O que já mudou",
    subtitulo: "Em vigor agora (ciclo 2026)",
    tom: "text-primary",
    itens: [
      {
        id: "cbs-ibs-teste",
        titulo: "CBS e IBS em ano-teste",
        detalhe:
          "Alíquotas simbólicas (0,9% CBS e 0,1% IBS) passam a constar dos documentos fiscais, compensáveis integralmente com PIS/COFINS.",
        data: "Jan/2026",
        prazoAno: 2026,
        tags: ["Nota fiscal", "Apuração"],
        publico: "Empresas",
        categoria: "Nota Fiscal & Emissão",
        urgencia: "alta",
      },
      {
        id: "novos-campos-nfe",
        titulo: "Novos campos obrigatórios na NF-e e NFS-e",
        detalhe:
          "Layouts atualizados com grupos de IBS/CBS, código de classificação tributária e imposto destacado por item.",
        data: "Jan/2026",
        prazoAno: 2026,
        tags: ["ERP", "Emissão"],
        publico: "Empresas",
        categoria: "ERP & Sistemas",
        urgencia: "alta",
      },
      {
        id: "comite-gestor-ibs",
        titulo: "Instalação do Comitê Gestor do IBS",
        detalhe:
          "Estrutura de governança compartilhada entre estados e municípios entra em operação para administrar a arrecadação e distribuição do IBS.",
        data: "2025–2026",
        prazoAno: 2026,
        tags: ["Governança"],
        publico: "Todos",
        categoria: "Regulamentação & Leis",
        urgencia: "informativa",
      },
    ],
  },
  {
    id: "breve",
    titulo: "Entra em vigor em breve",
    subtitulo: "Próximos marcos da transição",
    tom: "text-primary",
    itens: [
      {
        id: "cbs-substitui-pis-cofins",
        titulo: "CBS substitui PIS e COFINS integralmente",
        detalhe:
          "Fim do regime cumulativo e não cumulativo federal; crédito financeiro amplo passa a valer para todas as compras tributadas.",
        data: "Jan/2027",
        prazoAno: 2027,
        tags: ["Federal", "Crédito"],
        publico: "Empresas",
        categoria: "Crédito & Caixa",
        urgencia: "alta",
      },
      {
        id: "ipi-zerado",
        titulo: "IPI zerado para a maioria dos produtos",
        detalhe:
          "Mantido apenas como Imposto Seletivo em itens específicos e preservação da competitividade da Zona Franca de Manaus.",
        data: "Jan/2027",
        prazoAno: 2027,
        tags: ["Preços", "Indústria"],
        publico: "Empresas",
        categoria: "Preços & Margens",
        urgencia: "media",
      },
      {
        id: "imposto-seletivo-cashback",
        titulo: "Imposto Seletivo e cashback ativos",
        detalhe:
          "Devolução de tributos para famílias no CadÚnico e sobretaxa em produtos nocivos à saúde e ao meio ambiente (cigarros, bebidas, etc.).",
        data: "2027",
        prazoAno: 2027,
        tags: ["Social", "Preços"],
        publico: "Consumidor",
        categoria: "Social & Consumo",
        urgencia: "media",
      },
      {
        id: "reducao-icms-iss",
        titulo: "Redução gradual de ICMS e ISS",
        detalhe:
          "Queda de 10% ao ano nas alíquotas estaduais e municipais, com a alíquota do IBS crescendo em contrapartida até 2032.",
        data: "2029–2032",
        prazoAno: 2029,
        tags: ["Estadual", "Municipal"],
        publico: "Empresas",
        categoria: "Preços & Margens",
        urgencia: "informativa",
      },
    ],
  },
  {
    id: "pendente",
    titulo: "Depende de regulamentação",
    subtitulo: "Ainda em definição normativa",
    tom: "text-destructive",
    itens: [
      {
        id: "aliquota-definitiva",
        titulo: "Alíquota de referência definitiva",
        detalhe:
          "O percentual final será fixado por resolução com base na arrecadação apurada; 26,5% é a estimativa padrão de referência.",
        data: "Até 2027",
        prazoAno: 2027,
        tags: ["Alíquota", "Teto"],
        publico: "Todos",
        categoria: "Regulamentação & Leis",
        urgencia: "alta",
      },
      {
        id: "split-payment-regras",
        titulo: "Split payment e liquidação financeira",
        detalhe:
          "Mecanismo de retenção automática do imposto no ato do pagamento (PIX, cartão, boleto) tem integrações bancárias em regulamentação.",
        data: "Em definição",
        prazoAno: 2026,
        tags: ["Operacional", "Caixa"],
        publico: "Empresas",
        categoria: "Crédito & Caixa",
        urgencia: "alta",
      },
      {
        id: "credito-presumido-agro",
        titulo: "Créditos presumidos do agro e transportador autônomo",
        detalhe:
          "Percentuais e sistemática de apropriação do crédito pelo adquirente dependem de lei complementar e atos do Comitê Gestor.",
        data: "Em definição",
        prazoAno: 2026,
        tags: ["Agro", "Crédito"],
        publico: "Agronegócio",
        categoria: "Agro",
        urgencia: "media",
      },
      {
        id: "simples-hibrido-regras",
        titulo: "Regras operacionais do Simples Nacional híbrido",
        detalhe:
          "Detalhamento dos procedimentos para a opção de apurar IBS/CBS pelo regime regular e transferir crédito integral ao cliente PJ.",
        data: "Em definição",
        prazoAno: 2026,
        tags: ["Simples", "B2B"],
        publico: "MEI e Simples",
        categoria: "Jurídico & Contratos",
        urgencia: "alta",
      },
    ],
  },
  {
    id: "fazer",
    titulo: "O que fazer agora",
    subtitulo: "Checklist prático de adaptação",
    tom: "text-primary",
    itens: [
      {
        id: "chk-erp",
        titulo: "Atualizar ERP e emissores fiscais",
        detalhe:
          "Garantir suporte aos novos grupos de IBS/CBS, classificação tributária (cBenef/cTrib) e destaque por item.",
        data: "Imediato",
        prazoAno: 2026,
        tags: ["TI", "Emissão"],
        publico: "Empresas",
        categoria: "ERP & Sistemas",
        urgencia: "alta",
      },
      {
        id: "chk-cadastro",
        titulo: "Revisar cadastro de produtos e serviços",
        detalhe:
          "Reclassificar NCM/NBS conforme regimes reduzidos (saúde, educação, alimentos), alíquota zero e cesta básica nacional.",
        data: "Imediato",
        prazoAno: 2026,
        tags: ["Cadastro", "Classificação"],
        publico: "Empresas",
        categoria: "Nota Fiscal & Emissão",
        urgencia: "alta",
      },
      {
        id: "chk-precificacao",
        titulo: "Recalcular preços e margens",
        detalhe:
          "Com o crédito integral amplo, o custo do insumo cai. Refaça a formação de preço de venda antes de repassar reajustes.",
        data: "2026",
        prazoAno: 2026,
        tags: ["Financeiro", "Preço"],
        publico: "Empresas",
        categoria: "Preços & Margens",
        urgencia: "alta",
      },
      {
        id: "chk-contratos",
        titulo: "Mapear contratos de longo prazo",
        detalhe:
          "Incluir cláusulas de reequilíbrio econômico-fiscal para acomodar as variações graduais de alíquota ao longo da transição.",
        data: "2026",
        prazoAno: 2026,
        tags: ["Jurídico", "Contratos"],
        publico: "Empresas",
        categoria: "Jurídico & Contratos",
        urgencia: "media",
      },
      {
        id: "chk-simples",
        titulo: "Avaliar permanência no Simples",
        detalhe:
          "Comparar a guia única vs. apuração de IBS/CBS por fora, mensurando o volume de vendas B2B e a pressão por crédito dos clientes.",
        data: "2026",
        prazoAno: 2026,
        tags: ["Simples", "Estratégia"],
        publico: "MEI e Simples",
        categoria: "Jurídico & Contratos",
        urgencia: "media",
      },
    ],
  },
];
