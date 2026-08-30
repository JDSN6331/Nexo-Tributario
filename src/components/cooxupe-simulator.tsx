import { useState, useMemo, useEffect } from "react";
import {
  identificarRegraNCM,
  calcularCotacaoAnalista,
  buscarPorSku,
  buscarPorNome,
  CATALOGO_PRODUTOS_COMPLETO,
  type ProdutoAgro,
  type PerfilComprador,
} from "@/data/agro-catalog";
import { CurrencyInput } from "@/components/currency-input";
import { ExportBar } from "@/components/export-bar";
import type { ExportPayload } from "@/lib/export";
import { brl } from "@/lib/reforma";

type TipoBusca = "nome" | "sku";

export function CooxupeSimulator() {
  /* ==========================================================================
     ESTADO PRINCIPAL DO MOTOR TRIBUTÁRIO & COTAÇÃO
     ========================================================================== */
  const [tipoBusca, setTipoBusca] = useState<TipoBusca>("nome");
  const [termoNome, setTermoNome] = useState("");
  const [termoSku, setTermoSku] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoAgro | null>(() => {
    return (
      CATALOGO_PRODUTOS_COMPLETO.find((p) => p.codigo === "9364") ||
      CATALOGO_PRODUTOS_COMPLETO.find((p) => p.codigo === "76750") ||
      CATALOGO_PRODUTOS_COMPLETO[0] ||
      null
    );
  });
  const [valorSimulacaoUnitario, setValorSimulacaoUnitario] = useState(10000);
  const [perfilComprador, setPerfilComprador] = useState<PerfilComprador>("cooperado_regular");

  const ncmAtual = produtoSelecionado?.ncm || "31052000";

  // Identificação da regra tributária
  const regraAtiva = useMemo(() => {
    return identificarRegraNCM(ncmAtual);
  }, [ncmAtual]);

  // Cálculo da cotação
  const cotacaoAtiva = useMemo(() => {
    return calcularCotacaoAnalista({
      valorMercadoria: valorSimulacaoUnitario,
      regra: regraAtiva,
      perfil: perfilComprador,
    });
  }, [valorSimulacaoUnitario, regraAtiva, perfilComprador]);

  // Resultados de busca dinâmica por Nome do Produto na base de 30k itens
  const resultadosBuscaNome = useMemo(() => {
    if (!termoNome.trim()) return [];
    return buscarPorNome(termoNome, 12);
  }, [termoNome]);

  // Resultados de busca dinâmica por Código SKU na base de 30k itens
  const resultadosBuscaSku = useMemo(() => {
    if (!termoSku.trim()) return [];
    return buscarPorSku(termoSku, 12);
  }, [termoSku]);

  // Auto-seleção de produto ao digitar SKU exato ou carregar da URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const urlSku = params.get("sku");
      if (urlSku) {
        const match = buscarPorSku(urlSku.trim(), 1);
        if (match.length > 0) {
          setProdutoSelecionado(match[0]);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (tipoBusca === "sku" && termoSku.trim()) {
      const matchExatos = buscarPorSku(termoSku.trim(), 1);
      if (
        matchExatos.length > 0 &&
        matchExatos[0].codigo.toLowerCase() === termoSku.trim().toLowerCase()
      ) {
        setProdutoSelecionado(matchExatos[0]);
      }
    }
  }, [termoSku, tipoBusca]);

  // Handlers de seleção
  const handleSelecionarProduto = (p: ProdutoAgro) => {
    setProdutoSelecionado(p);
    setTermoNome("");
    setTermoSku("");
  };

  const formatarNCMDisplay = (ncm: string) => {
    const limpo = ncm.replace(/[^0-9]/g, "");
    if (limpo.length >= 8) {
      return `${limpo.slice(0, 4)}.${limpo.slice(4, 6)}.${limpo.slice(6, 8)}`;
    }
    if (limpo.length >= 4) {
      return `${limpo.slice(0, 4)}.${limpo.slice(4)}`;
    }
    return limpo || "0000.00.00";
  };

  /* ==========================================================================
     PAYLOAD DE EXPORTAÇÃO
     ========================================================================== */
  const labelPerfil =
    perfilComprador === "cooperado_regular"
      ? "Cooperado no Regime Regular (IBS/CBS 0% - Art. 271, II)"
      : perfilComprador === "cooperado_nao_regular"
      ? "Cooperado Produtor Não Regular (Diferimento Art. 138 / Anexo IX)"
      : "Terceiros / Mercado Geral (Ato Não Cooperativo / Regime Geral)";

  const payloadExportacao: ExportPayload = {
    nome: "cooxupe_cotacao_tributaria",
    titulo: `Cooxupé | Parecer e Cotação Comercial: ${produtoSelecionado?.nome || "Insumo Agropecuário"}`,
    linhas: [
      {
        secao: "Identificação da Mercadoria",
        campo: "Produto (Catálogo Cooxupé)",
        valor: produtoSelecionado ? produtoSelecionado.nome : "Insumo Agropecuário",
      },
      {
        secao: "Identificação da Mercadoria",
        campo: "Código SKU Cooxupé",
        valor: produtoSelecionado ? produtoSelecionado.codigo : "Não informado",
      },
      {
        secao: "Identificação da Mercadoria",
        campo: "Classificação Fiscal (NCM)",
        valor: formatarNCMDisplay(ncmAtual),
      },
      {
        secao: "Enquadramento Legal (LC 214/2025)",
        campo: "Grupo / Categoria",
        valor: regraAtiva.categoria,
      },
      {
        secao: "Enquadramento Legal (LC 214/2025)",
        campo: "Presença no Anexo IX",
        valor: regraAtiva.anexoIX ? "Sim (Insumo Agropecuário)" : "Não (Bens de Capital / Peças)",
      },
      {
        secao: "Enquadramento Legal (LC 214/2025)",
        campo: "Regime Aplicável na Reforma",
        valor: regraAtiva.regimeReforma,
      },
      {
        secao: "Parâmetros da Cotação Comercial",
        campo: "Perfil do Adquirente",
        valor: labelPerfil,
      },
      {
        secao: "Parâmetros da Cotação Comercial",
        campo: "Alíquota Efetiva na Cotação",
        valor: cotacaoAtiva.aliquotaTexto,
      },
      {
        secao: "Parâmetros da Cotação Comercial",
        campo: "Regra / Tratamento Específico",
        valor: cotacaoAtiva.regraAplicada,
      },
      {
        secao: "Parâmetros da Cotação Comercial",
        campo: "Fundamentação Legal",
        valor: cotacaoAtiva.fundamentacaoLegal,
      },
      {
        secao: "Simulação de Valores da Cotação",
        campo: "Valor Base da Mercadoria",
        valor: brl(valorSimulacaoUnitario),
      },
      {
        secao: "Simulação de Valores da Cotação",
        campo: "IBS + CBS Destacado na Operação",
        valor: brl(cotacaoAtiva.impostoDestacado),
      },
      {
        secao: "Simulação de Valores da Cotação",
        campo: "Preço Faturado ao Comprador",
        valor: brl(cotacaoAtiva.precoFinal),
      },
      {
        secao: "Simulação de Valores da Cotação",
        campo: "Crédito Financeiro Apropriável",
        valor: cotacaoAtiva.diferimentoAtivo
          ? "Diferido (Sem destaque imediato)"
          : brl(cotacaoAtiva.creditoApropriavel),
      },
      {
        secao: "Comparativo de Sistemas",
        campo: "Regime Atual (Convênio 100/97 e PIS/COFINS)",
        valor: regraAtiva.modeloAtual,
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* ====================================================================
          BANNER INSTITUCIONAL COOXUPÉ
          ==================================================================== */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950/70 via-background to-emerald-950/50 p-7 shadow-glass ring-1 ring-emerald-500/30 md:p-9">
        <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
              <i className="fi fi-rr-database text-xs leading-none" />
              Catálogo Cooxupé Integrado: 30.225 Produtos
            </span>
          </div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            Simulador de Tratamento Tributário de Insumos & Cotação Comercial
          </h2>
          <p className="max-w-[76ch] text-sm leading-relaxed text-muted-foreground">
            Ambiente analítico para apoiar os <strong>Analistas de Mercado</strong> na elaboração de
            cotações com a tributação e enquadramento fiscal exatos. Pesquise pelo <strong>Nome do Produto</strong> ou pelo <strong>Código SKU</strong> para simular a precificação por perfil de adquirente conforme a LC 214/2025 e Decreto nº 12.955/2026.
          </p>
        </div>
      </div>

      {/* ====================================================================
          PAINEL DE BUSCA (NOME DO PRODUTO OU CÓDIGO SKU)
          ==================================================================== */}
      <div className="rounded-3xl bg-background/40 p-6 shadow-glass ring-1 ring-border md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h3 className="font-display text-lg font-semibold text-foreground flex items-center gap-2">
              <i className="fi fi-rr-search text-emerald-400 text-base leading-none" />
              Pesquisar Mercadoria no Catálogo Cooxupé
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Localize o produto pelo nome comercial ou pelo código SKU do sistema
            </p>
          </div>

          {/* SELETOR DOS 2 TIPOS DE BUSCA */}
          <div className="flex items-center gap-1.5 rounded-2xl bg-background/80 p-1.5 ring-1 ring-border">
            <button
              type="button"
              onClick={() => setTipoBusca("nome")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                tipoBusca === "nome"
                  ? "bg-emerald-500 text-emerald-950 shadow-[0_0_16px_rgba(16,185,129,0.35)]"
                  : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
              }`}
            >
              <i className="fi fi-rr-label text-xs leading-none" />
              Nome do Produto
            </button>

            <button
              type="button"
              onClick={() => setTipoBusca("sku")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                tipoBusca === "sku"
                  ? "bg-emerald-500 text-emerald-950 shadow-[0_0_16px_rgba(16,185,129,0.35)]"
                  : "text-muted-foreground hover:bg-background/80 hover:text-foreground"
              }`}
            >
              <i className="fi fi-rr-box text-xs leading-none" />
              Código SKU
            </button>
          </div>
        </div>

        {/* INPUTS PADRONIZADOS */}
        <div>
          {/* MODO 1: NOME DO PRODUTO */}
          {tipoBusca === "nome" && (
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="input-nome" className="text-xs font-semibold text-foreground">
                  Pesquisar por Nome Comercial ou Princípio Ativo
                </label>
                <span className="text-[11px] text-muted-foreground">
                  Ex: <strong className="text-emerald-400">Opera</strong>, <strong className="text-emerald-400">Palini</strong>, <strong className="text-emerald-400">Ureia</strong>, <strong className="text-emerald-400">Silwet</strong>, <strong className="text-emerald-400">YaraMila</strong>, <strong className="text-emerald-400">Trator</strong>...
                </span>
              </div>
              <div className="relative">
                <input
                  id="input-nome"
                  type="text"
                  value={termoNome}
                  onChange={(e) => setTermoNome(e.target.value)}
                  placeholder="Digite o nome do produto ou princípio ativo (ex: Opera, Palini, Ureia, Silwet)..."
                  className="w-full h-12 rounded-xl bg-background/60 px-4 py-2 pl-10 text-sm font-medium text-foreground placeholder:text-muted-foreground placeholder:font-normal outline-none ring-1 ring-border focus:ring-emerald-500/50"
                />
                <i className="fi fi-rr-search absolute left-3.5 top-4 text-sm text-muted-foreground leading-none" />
                {termoNome && (
                  <button
                    type="button"
                    onClick={() => setTermoNome("")}
                    className="absolute right-3.5 top-3.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Dropdown de Resultados da Busca por Nome */}
              {termoNome.trim() && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl bg-card/95 p-2 shadow-2xl ring-1 ring-border backdrop-blur-xl divide-y divide-border/50 max-h-80 overflow-y-auto">
                  {resultadosBuscaNome.length > 0 ? (
                    <>
                      <span className="px-3 py-1.5 text-[10px] uppercase font-bold text-muted-foreground block">
                        Produtos Encontrados na Base Cooxupé ({resultadosBuscaNome.length})
                      </span>
                      {resultadosBuscaNome.map((p) => (
                        <button
                          key={p.codigo}
                          type="button"
                          onClick={() => handleSelecionarProduto(p)}
                          className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-all hover:bg-emerald-500/10 group"
                        >
                          <div>
                            <span className="text-xs font-semibold text-foreground group-hover:text-emerald-400 block">
                              {p.nome}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              {p.categoriaSugerida} ·{" "}
                              <strong className="text-amber-400 font-mono">SKU: {p.codigo}</strong>
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono text-xs text-emerald-400 font-bold block">
                              NCM {p.ncmFormatado}
                            </span>
                            {p.anexoIX ? (
                              <span className="text-[9px] text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded font-medium">
                                Anexo IX
                              </span>
                            ) : (
                              <span className="text-[9px] text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded font-medium">
                                Bens de Capital
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-xs text-muted-foreground">
                        Nenhum produto cadastrado encontrado para <strong className="text-foreground">"{termoNome}"</strong>.
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Experimente buscar por termos parciais como <em>Opera</em>, <em>Palini</em>, <em>Adubo</em> ou <em>Ureia</em>.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* MODO 2: CÓDIGO SKU */}
          {tipoBusca === "sku" && (
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="input-sku" className="text-xs font-semibold text-foreground">
                  Pesquisar por Código SKU do Catálogo Cooxupé
                </label>
                <span className="text-[11px] text-muted-foreground">
                  Ex: <strong className="text-amber-400 font-mono">9364</strong> (Opera 5L) · <strong className="text-amber-400 font-mono">3036</strong> (Opera 1L) · <strong className="text-amber-400 font-mono">76793</strong> (Silo Palini) · <strong className="text-amber-400 font-mono">76795</strong> (Descascador)
                </span>
              </div>
              <div className="relative">
                <input
                  id="input-sku"
                  type="text"
                  value={termoSku}
                  onChange={(e) => setTermoSku(e.target.value)}
                  placeholder="Digite o código SKU do item (ex: 9364, 3036, 76793, 76795, 19250)..."
                  className="w-full h-12 rounded-xl bg-background/60 px-4 py-2 pl-10 text-sm font-medium text-foreground placeholder:text-muted-foreground placeholder:font-normal outline-none ring-1 ring-border focus:ring-emerald-500/50"
                />
                <i className="fi fi-rr-box absolute left-3.5 top-4 text-sm text-muted-foreground leading-none" />
                {termoSku && (
                  <button
                    type="button"
                    onClick={() => setTermoSku("")}
                    className="absolute right-3.5 top-3.5 text-xs text-muted-foreground hover:text-foreground"
                  >
                    Limpar
                  </button>
                )}
              </div>

              {/* Dropdown de Resultados da Busca por SKU */}
              {termoSku.trim() && (
                <div className="absolute left-0 right-0 top-full z-20 mt-2 rounded-2xl bg-card/95 p-2 shadow-2xl ring-1 ring-border backdrop-blur-xl divide-y divide-border/50 max-h-80 overflow-y-auto">
                  {resultadosBuscaSku.length > 0 ? (
                    <>
                      <span className="px-3 py-1.5 text-[10px] uppercase font-bold text-muted-foreground block">
                        Itens Encontrados pelo SKU na Cooxupé ({resultadosBuscaSku.length})
                      </span>
                      {resultadosBuscaSku.map((p) => (
                        <button
                          key={p.codigo}
                          type="button"
                          onClick={() => handleSelecionarProduto(p)}
                          className="w-full flex items-center justify-between p-3 rounded-xl text-left transition-all hover:bg-emerald-500/10 group"
                        >
                          <div>
                            <span className="text-xs font-semibold text-foreground group-hover:text-emerald-400 block">
                              <strong className="text-amber-400 font-mono mr-1.5">SKU {p.codigo}</strong> · {p.nome}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              {p.categoriaSugerida}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-mono text-xs text-emerald-400 font-bold block">
                              NCM {p.ncmFormatado}
                            </span>
                            {p.anexoIX ? (
                              <span className="text-[9px] text-emerald-300 bg-emerald-500/15 px-1.5 py-0.5 rounded font-medium">
                                Anexo IX
                              </span>
                            ) : (
                              <span className="text-[9px] text-amber-300 bg-amber-500/15 px-1.5 py-0.5 rounded font-medium">
                                Bens de Capital
                              </span>
                            )}
                          </div>
                        </button>
                      ))}
                    </>
                  ) : (
                    <div className="p-4 text-center">
                      <p className="text-xs text-amber-400 font-semibold">
                        SKU "{termoSku}" não localizado na planilha de produtos da Cooxupé.
                      </p>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        Experimente pesquisar pelo <strong>Nome do Produto</strong> na primeira aba.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* CARD DO PRODUTO ATUAL SELECIONADO */}
        {produtoSelecionado && (
          <div className="rounded-2xl bg-background/60 p-4 ring-1 ring-border/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="grid size-10 place-items-center rounded-xl bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30 shrink-0 mt-0.5">
                <i className="fi fi-rr-box text-lg leading-none" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                    Mercadoria Selecionada:
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 px-2 py-0.5 text-xs font-mono font-bold text-amber-400 ring-1 ring-amber-500/30">
                    SKU: {produtoSelecionado.codigo}
                  </span>
                </div>

                <p className="mt-1 text-sm font-semibold text-foreground">
                  {produtoSelecionado.nome}
                </p>

                <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>
                    NCM Oficial: <strong className="font-mono text-emerald-400">{formatarNCMDisplay(ncmAtual)}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Categoria: <strong className="text-foreground">{regraAtiva.categoria}</strong>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {regraAtiva.anexoIX ? (
                <span className="rounded-xl bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30 flex items-center gap-1.5">
                  <i className="fi fi-rr-check text-xs leading-none" />
                  Insumo do Anexo IX (LC 214/2025)
                </span>
              ) : (
                <span className="rounded-xl bg-amber-500/15 px-3 py-1.5 text-xs font-semibold text-amber-400 ring-1 ring-amber-500/30 flex items-center gap-1.5">
                  <i className="fi fi-rr-info text-xs leading-none" />
                  Bens de Capital / Peças (Fora do Anexo IX)
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ====================================================================
          SELETOR DO PERFIL DO ADQUIRENTE
          ==================================================================== */}
      <div className="rounded-3xl bg-background/40 p-6 shadow-glass ring-1 ring-border md:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <div>
            <h3 className="font-display text-base font-bold text-foreground flex items-center gap-2">
              <i className="fi fi-rr-user text-emerald-400 text-base leading-none" />
              Perfil do Adquirente
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Selecione o destinatário para que o motor tributário aplique o regime correto da LC 214/2025
            </p>
          </div>
          <span className="rounded-xl bg-emerald-500/15 px-3.5 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
            Alíquota na Cotação: {cotacaoAtiva.aliquotaTexto}
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {/* Opção 1: Cooperado Regular */}
          <button
            type="button"
            onClick={() => setPerfilComprador("cooperado_regular")}
            className={`flex flex-col justify-between rounded-2xl p-4 text-left transition-all ring-1 ${
              perfilComprador === "cooperado_regular"
                ? "bg-emerald-500/20 ring-emerald-500 text-foreground shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                : "bg-background/40 ring-border text-muted-foreground hover:bg-background/70 hover:text-foreground"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground flex items-center gap-2">
                  <i className="fi fi-rr-wheat text-emerald-400 text-base leading-none" />
                  Cooperado no Regime Regular
                </span>
                {perfilComprador === "cooperado_regular" && (
                  <i className="fi fi-br-check text-xs text-emerald-400 leading-none" />
                )}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                Pessoa Jurídica ou Produtor Rural contribuinte optante pelo regime regular do IBS/CBS.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-border/50">
              <span className="text-xs font-bold text-emerald-400 block">
                IBS/CBS = 0% (Alíquota Zero)
              </span>
              <span className="text-[10px] text-muted-foreground">
                Art. 271, II da LC nº 214/2025
              </span>
            </div>
          </button>

          {/* Opção 2: Cooperado Não Regular */}
          <button
            type="button"
            onClick={() => setPerfilComprador("cooperado_nao_regular")}
            className={`flex flex-col justify-between rounded-2xl p-4 text-left transition-all ring-1 ${
              perfilComprador === "cooperado_nao_regular"
                ? "bg-emerald-500/20 ring-emerald-500 text-foreground shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                : "bg-background/40 ring-border text-muted-foreground hover:bg-background/70 hover:text-foreground"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground flex items-center gap-2">
                  <i className="fi fi-rr-tractor text-emerald-400 text-base leading-none" />
                  Cooperado Produtor Não Regular
                </span>
                {perfilComprador === "cooperado_nao_regular" && (
                  <i className="fi fi-br-check text-xs text-emerald-400 leading-none" />
                )}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                Produtor rural pessoa física / não contribuinte que entrega sua produção à Cooxupé.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-border/50">
              <span className="text-xs font-bold text-emerald-400 block">
                {regraAtiva.anexoIX ? "Diferimento de IBS/CBS" : "Regime com Anulação de Crédito"}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {regraAtiva.anexoIX ? "Art. 138, §2º / §3º (Anexo IX)" : "Art. 271, §1º, II da LC 214"}
              </span>
            </div>
          </button>

          {/* Opção 3: Terceiros / Mercado */}
          <button
            type="button"
            onClick={() => setPerfilComprador("terceiro_mercado")}
            className={`flex flex-col justify-between rounded-2xl p-4 text-left transition-all ring-1 ${
              perfilComprador === "terceiro_mercado"
                ? "bg-amber-500/20 ring-amber-500 text-foreground shadow-[0_0_20px_rgba(245,158,11,0.25)]"
                : "bg-background/40 ring-border text-muted-foreground hover:bg-background/70 hover:text-foreground"
            }`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground flex items-center gap-2">
                  <i className="fi fi-rr-building text-amber-400 text-base leading-none" />
                  Terceiros / Mercado Geral
                </span>
                {perfilComprador === "terceiro_mercado" && (
                  <i className="fi fi-br-check text-xs text-amber-400 leading-none" />
                )}
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">
                Venda a não cooperados, revendas ou clientes de mercado (Ato Não Cooperativo).
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-border/50">
              <span className="text-xs font-bold text-amber-400 block">
                {regraAtiva.categoria === "Bioinsumos & Defensivos Biológicos"
                  ? "0,0% (Bioinsumos)"
                  : regraAtiva.anexoIX
                  ? "10,6% (Redução de 60%)"
                  : "26,5% (Regime Geral)"}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {regraAtiva.anexoIX ? "Art. 138 / Anexo IX" : "Regime Geral com Crédito Pleno"}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* ====================================================================
          QUADRO OFICIAL DE TRATAMENTO TRIBUTÁRIO (TABELA FULL WIDTH)
          ==================================================================== */}
      <div className="rounded-3xl bg-background/40 shadow-glass ring-1 ring-border overflow-hidden">
        {/* Header da Ficha Fiscal */}
        <div className="bg-background/60 p-6 md:p-7 border-b border-border flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/30 uppercase tracking-wider">
                Ficha Técnica de Classificação Fiscal
              </span>
              {regraAtiva.anexoIX ? (
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 ring-1 ring-emerald-500/30">
                  Enquadrado no Anexo IX da LC 214/2025
                </span>
              ) : (
                <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-amber-400 ring-1 ring-amber-500/30">
                  Bens & Mercadorias Gerais (Fora do Anexo IX)
                </span>
              )}
            </div>
            <h3 className="mt-2.5 font-display text-2xl font-bold text-foreground">
              {regraAtiva.categoria}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground max-w-[80ch] leading-relaxed">
              {regraAtiva.descricao}
            </p>
          </div>

          <div className="rounded-2xl bg-emerald-950/40 p-4 ring-1 ring-emerald-500/30 text-right min-w-[220px]">
            <span className="text-[11px] font-semibold uppercase text-emerald-400/80 block">
              Alíquota Efetiva na Cotação
            </span>
            <span className="text-3xl font-display font-black text-emerald-400 tracking-tight">
              {cotacaoAtiva.aliquotaTexto}
            </span>
            <span className="text-[10px] text-muted-foreground block mt-0.5">
              {cotacaoAtiva.regraAplicada}
            </span>
          </div>
        </div>

        {/* TABELA COMPARATIVA DE TRIBUTOS E FUNDAMENTAÇÃO LEGAL */}
        <div className="overflow-x-auto p-6 md:p-7">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-muted-foreground uppercase tracking-wider text-[11px]">
                <th className="pb-3 pr-4 font-semibold">Tributo / Esfera</th>
                <th className="pb-3 px-4 font-semibold">Regime de Enquadramento</th>
                <th className="pb-3 px-4 font-semibold">Alíquota na Cotação</th>
                <th className="pb-3 px-4 font-semibold">Tratamento de Crédito & Diferimento</th>
                <th className="pb-3 pl-4 font-semibold">Fundamentação Legal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {/* Linha CBS */}
              <tr className="hover:bg-background/50 transition-colors">
                <td className="py-3.5 pr-4 font-semibold text-foreground">
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-emerald-400 mr-1.5">
                    CBS
                  </span>
                  Federal (União)
                </td>
                <td className="py-3.5 px-4 font-medium text-foreground">
                  {perfilComprador === "cooperado_regular"
                    ? "Ato Cooperativo (Alíquota Zero)"
                    : perfilComprador === "cooperado_nao_regular"
                    ? regraAtiva.anexoIX
                      ? "Diferimento para Produtor"
                      : "Regime com Anulação de Crédito"
                    : regraAtiva.regimeReforma}
                </td>
                <td className="py-3.5 px-4 font-bold text-emerald-400">
                  {cotacaoAtiva.aliquotaEfetiva === 0
                    ? cotacaoAtiva.aliquotaTexto
                    : `${((cotacaoAtiva.cbsFederal / valorSimulacaoUnitario) * 100).toFixed(1)}%`}
                </td>
                <td className="py-3.5 px-4 text-emerald-400 font-medium">
                  {cotacaoAtiva.diferimentoAtivo
                    ? "Diferido (Sem recolhimento imediato)"
                    : "Crédito financeiro integral"}
                </td>
                <td className="py-3.5 pl-4 text-muted-foreground font-mono text-[11px]">
                  LC 214/2025 & Dec. 12.955/2026
                </td>
              </tr>

              {/* Linha IBS */}
              <tr className="hover:bg-background/50 transition-colors">
                <td className="py-3.5 pr-4 font-semibold text-foreground">
                  <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-emerald-400 mr-1.5">
                    IBS
                  </span>
                  Estados & Municípios
                </td>
                <td className="py-3.5 px-4 font-medium text-foreground">
                  {perfilComprador === "cooperado_regular"
                    ? "Ato Cooperativo (Alíquota Zero)"
                    : perfilComprador === "cooperado_nao_regular"
                    ? regraAtiva.anexoIX
                      ? "Diferimento para Produtor"
                      : "Regime com Anulação de Crédito"
                    : regraAtiva.regimeReforma}
                </td>
                <td className="py-3.5 px-4 font-bold text-emerald-400">
                  {cotacaoAtiva.aliquotaEfetiva === 0
                    ? cotacaoAtiva.aliquotaTexto
                    : `${((cotacaoAtiva.ibsSubnacional / valorSimulacaoUnitario) * 100).toFixed(1)}%`}
                </td>
                <td className="py-3.5 px-4 text-emerald-400 font-medium">
                  {cotacaoAtiva.diferimentoAtivo
                    ? "Diferido (Sem recolhimento imediato)"
                    : "Crédito financeiro integral"}
                </td>
                <td className="py-3.5 pl-4 text-muted-foreground font-mono text-[11px]">
                  EC 132/2023, Art. 156-A / LC 214
                </td>
              </tr>

              {/* Linha ICMS Antigo */}
              <tr className="hover:bg-background/50 transition-colors text-muted-foreground bg-background/20">
                <td className="py-3.5 pr-4 font-medium">
                  <span className="rounded bg-muted px-2 py-0.5 font-mono text-muted-foreground mr-1.5">
                    ICMS
                  </span>
                  Sistema Atual (Transição)
                </td>
                <td className="py-3.5 px-4">Convênio ICMS 100/97 / Conv. 52/91</td>
                <td className="py-3.5 px-4 font-medium text-foreground">1% a 4% (Insumos) / 5,6% (Máquinas)</td>
                <td className="py-3.5 px-4 text-amber-400">
                  CIAP em 48 parcelas para máquinas / Resíduo oculto
                </td>
                <td className="py-3.5 pl-4 font-mono text-[11px]">
                  Conv. 100/97 e 52/91
                </td>
              </tr>

              {/* Linha PIS/COFINS Antigo */}
              <tr className="hover:bg-background/50 transition-colors text-muted-foreground bg-background/20">
                <td className="py-3.5 pr-4 font-medium">
                  <span className="rounded bg-muted px-2 py-0.5 font-mono text-muted-foreground mr-1.5">
                    PIS/COFINS
                  </span>
                  Sistema Atual (Transição)
                </td>
                <td className="py-3.5 px-4">Alíquota Zero / Suspensão Agro</td>
                <td className="py-3.5 px-4 font-medium text-foreground">0,0%</td>
                <td className="py-3.5 px-4 text-amber-400">
                  Créditos presumidos restritos
                </td>
                <td className="py-3.5 pl-4 font-mono text-[11px]">
                  Lei Federal 10.925/2004
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* PAINÉIS DE REGRAS REGIONAIS E ATO COOPERATIVO */}
        <div className="grid gap-4 border-t border-border bg-background/30 p-6 md:p-7 sm:grid-cols-2">
          <div className="rounded-2xl bg-emerald-950/30 p-5 ring-1 ring-emerald-500/25">
            <span className="text-xs font-semibold text-emerald-400 uppercase flex items-center gap-2">
              <i className="fi fi-rr-building text-sm leading-none" />
              Regime Constitucional do Ato Cooperativo (LC 214/2025)
            </span>
            <p className="mt-2 text-xs text-foreground/90 leading-relaxed">
              {regraAtiva.atoCooperativo}
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Base Legal: Art. 146, III, "c" da CF/88 e Art. 271 da Lei Complementar nº 214/2025.
            </p>
          </div>

          <div className="rounded-2xl bg-amber-950/20 p-5 ring-1 ring-amber-500/25">
            <span className="text-xs font-semibold text-amber-400 uppercase flex items-center gap-2">
              <i className="fi fi-rr-marker text-sm leading-none" />
              Lojas Cooxupé em MG e SP: Princípio do Destino
            </span>
            <p className="mt-2 text-xs text-foreground/90 leading-relaxed">
              {regraAtiva.regraMGSP}
            </p>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Extinção definitiva do DIFAL, da substituição tributária (ST) e das barreiras interestaduais.
            </p>
          </div>
        </div>

        {/* SIMULADOR DE COTAÇÃO COMERCIAL DO ANALISTA */}
        <div className="border-t border-border bg-background/50 p-6 md:p-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wider flex items-center gap-2">
                <i className="fi fi-rr-sparkles text-emerald-400 text-sm leading-none" />
                Simulação de Cotação Comercial para esta Mercadoria
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                Calcule o preço líquido, imposto por fora e crédito conforme o perfil: <strong>{labelPerfil}</strong>
              </p>
            </div>
          </div>

          <div className="grid items-end gap-4 sm:grid-cols-12">
            <div className="sm:col-span-4">
              <label className="block">
                <span className="text-xs font-medium text-muted-foreground">
                  Valor Base da Mercadoria (R$):
                </span>
                <div className="mt-1.5">
                  <CurrencyInput
                    value={valorSimulacaoUnitario}
                    onChange={setValorSimulacaoUnitario}
                    className="w-full rounded-xl bg-background/70 px-3.5 py-2.5 text-sm font-semibold text-foreground ring-1 ring-border outline-none focus:ring-emerald-500/50"
                  />
                </div>
              </label>
            </div>

            <div className="sm:col-span-2 rounded-xl bg-background/60 p-3 ring-1 ring-border">
              <span className="text-[11px] text-muted-foreground block">Alíquota Cotação:</span>
              <span className="text-base font-display font-bold text-foreground">
                {cotacaoAtiva.aliquotaTexto}
              </span>
            </div>

            <div className="sm:col-span-3 rounded-xl bg-background/60 p-3 ring-1 ring-border">
              <span className="text-[11px] text-muted-foreground block">IBS + CBS em Nota:</span>
              <span className="text-base font-display font-bold text-emerald-400">
                {cotacaoAtiva.diferimentoAtivo ? "R$ 0,00 (Diferido)" : brl(cotacaoAtiva.impostoDestacado)}
              </span>
            </div>

            <div className="sm:col-span-3 rounded-xl bg-emerald-500/10 p-3 ring-1 ring-emerald-500/30">
              <span className="text-[11px] text-emerald-300 block">Preço Final Cotação:</span>
              <span className="text-base font-display font-bold text-emerald-400">
                {brl(cotacaoAtiva.precoFinal)}
              </span>
            </div>
          </div>
        </div>

        {/* BARRA DE EXPORTAÇÃO */}
        <div className="border-t border-border p-6 md:p-7 bg-background/60">
          <ExportBar
            payload={payloadExportacao}
            hint="Exporte o parecer, cotação comercial e enquadramento deste produto em PDF oficial, Excel ou CSV."
          />
        </div>
      </div>
    </div>
  );
}
