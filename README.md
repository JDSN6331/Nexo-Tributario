# Nexo Tributário · Plataforma de Inteligência & Simulação da Reforma Tributária

Plataforma inteligente de simulação estratégica, inteligência fiscal e precificação analítica desenvolvida para a **Reforma Tributária sobre o Consumo**, em estrita conformidade com a **Emenda Constitucional nº 132/2023**, a **Lei Complementar nº 214/2025** e o **Decreto nº 12.955/2026**.

Este documento foi elaborado para guiar analistas, consultores, contadores e a equipe do **Setor Tributário** na validação das funcionalidades, cálculos, bases normativas e cenários da ferramenta.

---

## 📑 Sumário

1. [Visão Geral da Reforma Tributária](#-1-visão-geral-da-reforma-tributária)
2. [Pilares Normativos e Regras de Cálculo Adotadas](#-2-pilares-normativos-e-regras-de-cálculo-adotadas)
3. [Guia de Funcionalidades por Módulo](#-3-guia-de-funcionalidades-por-módulo)
   - [Módulo 1: Visão Geral & Painel Estratégico (`/`)](#módulo-1-visão-geral--painel-estratégico-)
   - [Módulo 2: Central de Simulação Avançada (`/simulador`)](#módulo-2-central-de-simulação-avançada-simulador)
   - [Módulo 3: Calculadoras Rápidas & Estratégicas (`/ferramentas`)](#módulo-3-calculadoras-rápidas--estratégicas-ferramentas)
   - [Módulo 4: Radar de Mudanças & Checklist Regulatório (`/radar`)](#módulo-4-radar-de-mudanças--checklist-regulatório-radar)
   - [Módulo 5: Base de Conhecimento & Glossário Didático (`/aprender`)](#módulo-5-base-de-conhecimento--glossário-didático-aprender)
   - [Recursos Transversais (Busca Global `Ctrl+K` e Exportação)](#recursos-transversais)
4. [Roteiro de Validação para o Setor Tributário](#-4-roteiro-de-validação-para-o-setor-tributário)
5. [Quadro de Fundamentação Legal](#-5-quadro-de-fundamentação-legal)
6. [Instalação e Execução Técnica](#-6-instalação-e-execução-técnica)
7. [Aviso de Governança e Isenção](#-7-aviso-de-governança-e-isenção)

---

## 🏛️ 1. Visão Geral da Reforma Tributária

A Reforma Tributária substitui o complexo e fragmentado modelo tributário sobre o consumo brasileiro por um **Imposto sobre Valor Agregado Dual (IVA Dual)** composto por:

- **CBS (Contribuição sobre Bens e Serviços)**: Tributo de competência da União, substituindo PIS e COFINS (e absorvendo parte do IPI).
- **IBS (Imposto sobre Bens e Serviços)**: Tributo de competência compartilhada entre Estados, Distrito Federal e Municípios, substituindo ICMS e ISS.
- **IS (Imposto Seletivo)**: Tributo federal monofásico ("imposto do pecado") incidente sobre a produção ou comercialização de bens e serviços prejudiciais à saúde ou ao meio ambiente.

### Comparativo Estrutural

```
┌────────────────────────────────────────────────────────┐
│                    SISTEMA ATUAL                       │
│  PIS + COFINS (Federal) + IPI (Federal)                │
│  ICMS (Estadual) + ISS (Municipal)                     │
│  • Cumulativo / Cumulativo parcial                     │
│  • Cálculo "por dentro" (imposto sobre imposto)        │
│  • Tributação na Origem (guerra fiscal)                │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼ (Transição 2026 - 2033)
┌────────────────────────────────────────────────────────┐
│                     NOVO IVA DUAL                      │
│  CBS (Federal) + IBS (Estadual / Municipal)            │
│  • Não Cumulatividade Plena (Crédito Financeiro Total) │
│  • Cálculo "por fora" (base líquida transparente)      │
│  • Tributação no Destino (local do consumo final)      │
│  • Retenção eletrônica instantânea (Split Payment)     │
└────────────────────────────────────────────────────────┘
```

---

## 📐 2. Pilares Normativos e Regras de Cálculo Adotadas

A plataforma implementa com rigor as fórmulas, alíquotas e cronogramas oficiais:

### 1. Alíquotas de Referência
- **Alíquota Padrão de Referência**: **26,5%** (CBS: **8,65%** + IBS: **17,85%**), conforme estimativas e notas técnicas do Ministério da Fazenda.
- **Regime Favorecido (Redução de 60%)**: **10,6%** — aplicável a insumos agropecuários (Anexo IX), serviços de saúde, educação e transporte coletivo de passageiros.
- **Regime Favorecido (Redução de 30%)**: **18,55%** — aplicável a serviços de profissões regulamentadas (advogados, contadores, engenheiros, etc.).
- **Alíquota Zero (0%)**: Cesta Básica Nacional e insumos agropecuários de destinação prioritária.

### 2. Mecânica de Cálculo "Por Fora" vs "Por Dentro"
- **Modelo Atual (Por Dentro)**: O tributo integra sua própria base de cálculo.
  $$\text{Preço Final} = \frac{\text{Preço Base}}{1 - \text{Alíquota Atual}}$$
- **Novo Modelo (Por Fora - IVA)**: O tributo incide diretamente sobre o preço líquido de venda.
  $$\text{Tributo Destacado} = \text{Preço Base} \times \text{Alíquota IVA}$$
  $$\text{Preço Final ao Cliente} = \text{Preço Base} + \text{Tributo Destacado}$$

### 3. Crédito Não Cumulativo Pleno (Crédito Financeiro)
Diferente do modelo atual (que restringe créditos a insumos diretos físicos), o novo modelo assegura o **direito a crédito financeiro integral** sobre qualquer bem ou serviço adquirido que tenha suportado IBS/CBS (energia, serviços de terceiros, tecnologia, fretes, ativo imobilizado, etc.).

### 4. Cronograma Oficial de Transição (2026–2033)

| Ano | CBS | IBS | Tributos Antigos | Descrição Operacional |
| :---: | :---: | :---: | :---: | :--- |
| **2026** | **0,9%** | **0,1%** | 100% (PIS/COFINS/ICMS/ISS/IPI) | **Ano-teste**: Alíquotas simbólicas (1,0%) compensáveis com PIS/COFINS. Início do layout da NF-e. |
| **2027** | **8,65%** | **0,1%** | ICMS/ISS plenos (PIS/COFINS extintos) | **Vigência plena da CBS**: Extinção de PIS e COFINS; IPI zerado na quase totalidade dos itens; início do *Split Payment*. |
| **2028** | 8,65% | 0,1% | ICMS/ISS plenos | Consolidação da CBS e ajustes no Comitê Gestor do IBS. |
| **2029** | 8,65% | 1,785% | 90% de ICMS/ISS | Início da transição do IBS (redução de 10% do ICMS/ISS). |
| **2030** | 8,65% | 3,57% | 80% de ICMS/ISS | Redução de 20% do ICMS/ISS. |
| **2031** | 8,65% | 5,355% | 70% de ICMS/ISS | Redução de 30% do ICMS/ISS. |
| **2032** | 8,65% | 7,14% | 60% de ICMS/ISS | Redução de 40% do ICMS/ISS. |
| **2033** | **8,65%** | **17,85%** | **0% (Extintos)** | **Modelo Pleno**: 100% IBS + CBS (IVA Dual completo). Extinção total de ICMS, ISS e IPI. |

---

## 🖥️ 3. Guia de Funcionalidades por Módulo

### Módulo 1: Visão Geral & Painel Estratégico (`/`)
- **Hero Interativo**: Apresentação visual da unificação dos 5 tributos em 2.
- **Antes e Depois**: Matriz comparativa de 3 pilares práticos:
  - *Preço transparente* (destaque na nota fiscal).
  - *Fim do imposto em cascata* (crédito financeiro total).
  - *Princípio do destino* (fim da guerra fiscal interestadual).
- **Linha do Tempo Visual**: Detalhamento ano a ano da transição até 2033.
- **Painel por Perfil de Impacto**:
  - *Empresas em Geral* (efeito de fluxo de caixa e créditos).
  - *MEI & Simples Nacional* (manutenção do regime vs transferência de crédito B2B).
  - *Agronegócio & Cooperativas* (alíquota zero, redução de 60% e atos cooperativos).
  - *Consumidor Final* (transparência e mecanismo de *Cashback* social).
- **Mitos e Fatos**: Esclarecimento fundamentado sobre 3 mitos populares da reforma.

---

### Módulo 2: Central de Simulação Avançada (`/simulador`)

A central analítica contém duas ferramentas especializadas:

#### Aba 1: Simulador Corporativo & Transição
Permite que o setor tributário/financeiro projete a carga tributária anual da empresa durante todo o período de transição (2026–2033).
- **Parâmetros de Entrada**:
  - Receita Bruta Mensal (R$).
  - Insumos e Compras Tributadas no Mês (R$).
  - Mix de Alíquotas da Receita (% Padrão 26,5%, % Reduzida 10,6%, % Isenta 0%).
  - Alíquota Média Vigente Atual (% de PIS/COFINS/ICMS/ISS praticada hoje).
  - Índice de Cumulatividade Atual (% de insumos que hoje NÃO geram crédito fiscal).
- **Resultados e Métricas**:
  - Comparativo lado a lado: *Modelo Atual* × *Período de Transição* × *Modelo Pleno 2033*.
  - Débito bruto gerado sobre as vendas.
  - Crédito fiscal recuperável sobre insumos (comportamento antes e depois da não cumulatividade plena).
  - Imposto líquido a pagar e variação percentual da carga.
  - Gráfico comparativo de evolução anual.

#### Aba 2: Motor Agropecuário & Cotação Comercial (Catálogo de 30.225 Itens)
Desenvolvido com foco no **Agronegócio, Cooperativas Agropecuárias (ex.: Cooxupé) e Revendas de Insumos**:
- **Catálogo Integrado**: Base com mais de **30.000 insumos, defensivos, sementes, fertilizantes e maquinários** classificados por NCM e SKU.
- **Classificação Automática pelo Anexo IX da LC 214/2025**:
  - Identifica se o item possui **Redução de 60%** (alíquota efetiva de 10,6%) ou **Alíquota Zero / Isenção**.
- **Regime Específico do Cooperativismo (Art. 271, II e Art. 138 da LC 214/2025)**:
  - *Ato Cooperativo*: Operações entre a Cooperativa e o Cooperado são não-onerosas (alíquota zero / não incidência no ato de fornecimento).
- **Simulação por Perfil de Adquirente**:
  - `Cooperado Regular`: Isenção/Não incidência pelo ato cooperativo legal.
  - `Produtor Não Regular`: Tributação regular com alíquota reduzida do Anexo IX (10,6%).
  - `Mercado Geral / Terceiro`: Tributação padrão ou reduzida conforme a classificação do NCM.
- **Simulador de Cotação Comercial**:
  - Permite informar Custo Base e Margem Comercial desejada.
  - Calcula o preço de venda líquido, o IBS/CBS destacado por fora e o valor final de cotação.

---

### Módulo 3: Calculadoras Rápidas & Estratégicas (`/ferramentas`)

Sete calculadoras didáticas com memória de cálculo para análises pontuais:

1. **Preço Destacado (Cálculo Por Fora vs Por Dentro)**:
   - Demonstra a formação do preço de venda com a extração da base de cálculo líquida e o acréscimo transparente do IVA.
2. **Crédito Não Cumulativo Pleno**:
   - Quantifica a economia tributária de empresas que passam a creditar despesas de energia, telecomunicações, aluguéis e serviços.
3. **Split Payment & Impacto no Capital de Giro**:
   - Simula o efeito da retenção tributária imediata (no momento da liquidação bancária da NF-e) sobre o fluxo de caixa, comparando com o modelo atual de recolhimento em D+25 / D+30.
4. **Cesta Básica Nacional × Imposto Seletivo**:
   - Analisa o impacto da desoneração completa (alíquota 0%) de itens essenciais e a sobretaxação do Imposto Seletivo sobre produtos específicos.
5. **Diagnóstico Simples Nacional (2027+)**:
   - Auxilia empresas optantes pelo Simples Nacional a decidirem se devem recolher o IBS/CBS unificado no DAS ou migrar para o regime geral de IBS/CBS para transferir crédito integral aos seus clientes PJ (B2B).
6. **Impacto no Faturamento e Margem**:
   - Análise de elasticidade de preço e sensibilidade de margem operacional após a nova tributação.
7. **Produtor Rural e Crédito Presumido (Art. 281 da LC 214/2025)**:
   - Simula a situação do produtor pessoa física com receita anual até R$ 3,6 milhões (não contribuinte facultativo) e o cálculo do crédito presumido gerado para o adquirente industrial/comercial.
- **Links Externos Úteis**: Acesso direto à **Calculadora Oficial da Receita Federal** e portais de notícias em tempo real (CNN Brasil, InfoMoney).

---

### Módulo 4: Radar de Mudanças & Checklist Regulatório (`/radar`)

Painel estilo Kanban organizado em 4 colunas estratégicas:
- **1. O que já mudou**: Medidas já publicadas ou em vigor no ciclo atual (ano-teste 2026, novas tags de XML na NF-e/NFS-e, Comitê Gestor).
- **2. O que entra em breve**: Prazos de 2027 (vigência CBS, extinção PIS/COFINS, início do Split Payment).
- **3. Pendências regulatórias**: Projetos de lei complementares, Decretos e regulamentos do Comitê Gestor ainda em tramitação.
- **4. Checklist prático para empresas**: Lista interativa com caixas de seleção para controle interno de adequação (TI/ERP, contratos comerciais, parametrização fiscal e treinamento).
- **Filtros Dinâmicos**: Filtragem por perfil (`Empresas`, `MEI e Simples`, `Consumidor`, `Agronegócio` ou `Todos`).

---

### Módulo 5: Base de Conhecimento & Glossário Didático (`/aprender`)

- **FAQ (Perguntas Frequentes)**: Dúvidas práticas categorizadas com **exemplos numéricos passo a passo** em cada resposta.
- **Glossário Técnico**: Definições conceituais detalhadas de termos como *IBS*, *CBS*, *Imposto Seletivo*, *Split Payment*, *Não Cumulatividade Plena*, *Princípio do Destino*, *Cashback Tributário*, *Comitê Gestor do IBS*, etc.
- **Barra de Pesquisa Inteligente**: Filtra instantaneamente termos do glossário e perguntas do FAQ.

---

### Recursos Transversais

- **Busca Global Instantânea (`Ctrl + K` / `Cmd + K`)**:
  - Modal de busca presente em todas as telas para navegação rápida por calculadoras, produtos NCM, SKU, conceitos e artigos legais.
- **Exportação Executiva Completa (`ExportBar`)**:
  - Presente nas principais simulações.
  - Permite exportar os resultados e pareceres em:
    - **PDF Formatado**: Documento executivo pronto para apresentação à diretoria ou inclusão em dossiês tributários.
    - **Planilha Excel (.xlsx)**: Dados tabulados com métricas para modelagem contábil.
    - **Arquivo CSV**: Exportação limpa para importação em sistemas de BI ou ERP.

---

## 🔍 4. Roteiro de Validação para o Setor Tributário

Recomendamos que a equipe tributária execute os seguintes testes e validações:

```
[ ] 1. VALIDAÇÃO DAS FÓRMULAS DE CÁLCULO POR FORA (/ferramentas)
    • Inserir um preço base de R$ 1.000,00 e alíquota de 26,5%.
    • Conferir se o tributo calculado é R$ 265,00 e o total R$ 1.265,00.
    • Testar com outras alíquotas (10,6% e 18,55%).

[ ] 2. AUDITORIA DA TRANSIÇÃO PLURIANUAL (/simulador)
    • Informar a receita bruta e despesas com insumos da sua empresa.
    • Verificar se a curva de redução do ICMS/ISS (2029 a 2033) e entrada do IBS coincide com o Art. 132 da EC 132/2023.
    • Validar o ganho de crédito financeiro sobre os insumos antes cumulativos.

[ ] 3. CLASSIFICAÇÃO FISCAL DE NCM E SKU DO AGRO (/simulador -> Aba Agropecuária)
    • Pesquisar produtos agrícolas e defensivos de consumo habitual da empresa.
    • Verificar se o enquadramento no Anexo IX da LC 214/2025 está correto.
    • Testar a cotação comercial alternando entre "Cooperado Regular", "Produtor Não Regular" e "Mercado Geral".

[ ] 4. SIMULAÇÃO DO SPLIT PAYMENT NO FLUXO DE CAIXA (/ferramentas -> Split Payment)
    • Avaliar a redução do saldo médio em caixa considerando o recolhimento instantâneo da CBS/IBS na liquidação financeira.

[ ] 5. EXPORTAÇÃO DE RELATÓRIOS
    • Gerar um PDF e uma planilha Excel no Simulador e conferir o layout e os dados exportados.
```

---

## 📚 5. Quadro de Fundamentação Legal

| Instrumento Normativo | Ementa / Objeto | Aplicação na Plataforma |
| :--- | :--- | :--- |
| **Emenda Constitucional nº 132/2023** | Altera o Sistema Tributário Nacional para instituir o IVA Dual (IBS e CBS). | Cronograma de transição (2026–2033), alíquotas de teste e princípio do destino. |
| **Lei Complementar nº 214/2025** | Institui a CBS, o IBS e o Imposto Seletivo, dispondo sobre o regime geral, regimes específicos e diferenciados. | Alíquotas de referência, cálculo por fora, crédito pleno e split payment. |
| **LC 214/2025 — Anexo IX** | Lista de insumos agropecuários favorecidos com redução de 60% ou alíquota zero. | Motor de busca e classificação de NCM e SKU do catálogo de produtos. |
| **LC 214/2025 — Art. 138 e 271, II** | Regime específico das sociedades cooperativas e não incidência no ato cooperativo. | Regra de isenção/alíquota zero para compras efetuadas por cooperados regulares. |
| **LC 214/2025 — Art. 281** | Tratamento tributário do Produtor Rural Pessoa Física (limite R$ 3,6 mi/ano). | Calculadora de produtor rural e crédito presumido para o adquirente. |
| **Decreto nº 12.955/2026** | Regulamenta procedimentos operacionais, documentos fiscais e Comitê Gestor. | Prazos, novos campos de NF-e e itens do Radar de Mudanças. |

---

## 💻 6. Instalação e Execução Técnica

### Pré-requisitos
- **Node.js**: Versão 18.0.0 ou superior (ou runtime Bun).
- **Gerenciador de Pacotes**: `npm`, `yarn` ou `pnpm`.

### Comandos de Execução

```bash
# 1. Clonar o repositório ou acessar a pasta
cd Nexo-Tributario-main

# 2. Instalar as dependências do projeto
npm install

# 3. Iniciar o servidor local de desenvolvimento
npm run dev

# A aplicação estará acessível em: http://localhost:3000 (ou porta indicada no terminal)

# 4. Gerar o build de produção (opcional)
npm run build
```

---

## ⚖️ 7. Aviso de Governança e Isenção

As simulações, cálculos, estimativas e relatórios gerados pelo **Nexo Tributário** têm finalidade **didática, informativa e de suporte ao planejamento estratégico e orçamentário**. Os parâmetros de cálculo utilizam as alíquotas de referência divulgadas nos estudos oficiais do Ministério da Fazenda e o texto sancionado da Lei Complementar nº 214/2025. 

Esta plataforma é uma ferramenta de apoio analítico e **não substitui** pareceres jurídicos formais, auditorias contábeis específicas ou os sistemas oficiais de apuração da Receita Federal do Brasil e do Comitê Gestor do IBS.
