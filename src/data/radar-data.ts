/** Dados centralizados do Radar de Mudanças, Prazos e Changelog do Nexo Tributário. */

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

export const ULTIMA_ATUALIZACAO_RADAR = "08 de Setembro de 2026";

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
        titulo: "CBS e IBS em ano-teste operacional",
        detalhe:
          "Alíquotas simbólicas (0,9% CBS e 0,1% IBS) constam dos documentos fiscais eletrônicos, compensáveis integralmente na apuração mensal contra débitos de PIS/COFINS (sem aumento de carga).",
        data: "Jan/2026",
        prazoAno: 2026,
        tags: ["Nota fiscal", "Apuração", "Compensação"],
        publico: "Empresas",
        categoria: "Nota Fiscal & Emissão",
        urgencia: "alta",
      },
      {
        id: "novos-campos-nfe",
        titulo: "Novos campos e validações na NF-e e NFS-e",
        detalhe:
          "Layouts atualizados (Ajustes SINIEF) com grupos específicos de IBS/CBS, classificação tributária (cBenef/cTrib) e destaque do imposto por item para o ano-teste.",
        data: "Jan/2026",
        prazoAno: 2026,
        tags: ["ERP", "Emissão", "XML"],
        publico: "Empresas",
        categoria: "ERP & Sistemas",
        urgencia: "alta",
      },
      {
        id: "comite-gestor-ibs",
        titulo: "Instalação do Comitê Gestor do IBS (PLP 108/2024)",
        detalhe:
          "Estrutura provisória e câmaras técnicas do CGIBS em operação para padronizar o contencioso administrativo e gerir a futura distribuição federativa da arrecadação.",
        data: "2025–2026",
        prazoAno: 2026,
        tags: ["Governança", "CGIBS"],
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
          "Fim definitivo do regime cumulativo e não cumulativo federal; crédito financeiro amplo passa a valer para todas as compras tributadas com alíquota de 8,65%.",
        data: "Jan/2027",
        prazoAno: 2027,
        tags: ["Federal", "Crédito Pleno"],
        publico: "Empresas",
        categoria: "Crédito & Caixa",
        urgencia: "alta",
      },
      {
        id: "split-payment-operacional",
        titulo: "Início do Split Payment (Inteligente e Simplificado)",
        detalhe:
          "Retenção automática no ato da liquidação bancária: modelo inteligente com conferência do XML da NF-e para B2B e simplificado via adquirentes/PIX no varejo.",
        data: "Jan/2027",
        prazoAno: 2027,
        tags: ["Split Payment", "Bancos", "PIX"],
        publico: "Empresas",
        categoria: "Crédito & Caixa",
        urgencia: "alta",
      },
      {
        id: "ipi-zerado",
        titulo: "IPI zerado para a quase totalidade dos produtos",
        detalhe:
          "Preservado apenas para itens concorrentes com a produção da Zona Franca de Manaus e transferido para o Imposto Seletivo.",
        data: "Jan/2027",
        prazoAno: 2027,
        tags: ["Preços", "Indústria"],
        publico: "Empresas",
        categoria: "Preços & Margens",
        urgencia: "media",
      },
      {
        id: "imposto-seletivo-cashback",
        titulo: "Imposto Seletivo e Cashback ativos",
        detalhe:
          "Devolução de tributos para famílias cadastradas no CadÚnico (energia, gás, itens básicos) e sobretaxa em produtos nocivos à saúde e ao meio ambiente.",
        data: "2027",
        prazoAno: 2027,
        tags: ["Social", "Preços", "Cashback"],
        publico: "Consumidor",
        categoria: "Social & Consumo",
        urgencia: "media",
      },
      {
        id: "reducao-icms-iss",
        titulo: "Redução gradual de ICMS e ISS (10% ao ano)",
        detalhe:
          "Queda de 10% ao ano nas alíquotas estaduais e municipais a partir de 2029 (90%, 80%, 70%, 60%), com o IBS subindo na mesma proporção até a extinção em 2033.",
        data: "2029–2032",
        prazoAno: 2029,
        tags: ["Estadual", "Municipal", "Transição"],
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
        titulo: "Alíquota de referência definitiva e teto constitucional",
        detalhe:
          "O percentual padrão final será fixado por resolução com base na arrecadação observada na transição; 26,5% é o parâmetro padrão de referência oficial.",
        data: "Até 2027",
        prazoAno: 2027,
        tags: ["Alíquota", "Teto"],
        publico: "Todos",
        categoria: "Regulamentação & Leis",
        urgencia: "alta",
      },
      {
        id: "split-payment-regras",
        titulo: "Homologação das APIs bancárias do Split Payment",
        detalhe:
          "Testes de mensageria com o Banco Central e instituições de pagamento para conciliação em milissegundos entre nota fiscal e liquidação financeira.",
        data: "Em testes",
        prazoAno: 2026,
        tags: ["Operacional", "Caixa", "APIs"],
        publico: "Empresas",
        categoria: "Crédito & Caixa",
        urgencia: "alta",
      },
      {
        id: "credito-presumido-agro",
        titulo: "Percentuais setoriais de crédito presumido do agro (Art. 281)",
        detalhe:
          "Fixação dos percentuais (4,5% a 7%) para adquirentes industriais/comerciais de insumos e produtos de produtor rural pessoa física não contribuinte.",
        data: "2026",
        prazoAno: 2026,
        tags: ["Agro", "Crédito Presumido"],
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
