# Nexo Tributário

Plataforma inteligente de simulação, análise preditiva e inteligência fiscal para a **Reforma Tributária sobre o Consumo (Emenda Constitucional nº 132/2023, Lei Complementar nº 214/2025 e Decreto nº 12.955/2026)**.

O **Nexo Tributário** conecta as regras fiscais vigentes (PIS, COFINS, IPI, ICMS e ISS) ao novo modelo dual do IVA (CBS federal + IBS estadual/municipal), com foco especial em:
- **Simulações Corporativas**: transição gradativa de 2026 a 2033, crédito financeiro integral e fim da cumulatividade em cascata.
- **Agronegócio & Cooperativismo**: motor de classificação fiscal para mais de 30.000 itens por código NCM e SKU, com enquadramento no Anexo IX (insumos com redução de 60% ou alíquota zero) e aplicação das regras de cooperativas (Art. 271, II e Art. 138 da LC 214/2025).
- **Ferramentas Práticas**: cálculo de preço por fora, retenção imediata via *Split Payment*, impacto no capital de giro, diagnóstico de permanência no Simples Nacional e cesta básica nacional.
- **Radar de Mudanças**: central de alertas setoriais com checklist interativo, prazos de vigência e pendências regulatórias.

---

## 🚀 Funcionalidades Principais

1. **Simulador Avançado de Cenários (2026–2033)**:
   - Projeção detalhada da carga tributária mês a mês e ano a ano.
   - Mix de alíquotas: Padrão (26,5%), Reduzida em 60% (10,6%) e Alíquota Zero (0%).
   - Efeito de crédito de insumos antes e após a reforma.

2. **Simulador Agropecuário & Motor NCM / SKU**:
   - Busca em tempo real na base de insumos agrícolas e defensivos.
   - Parecer de enquadramento legal e alíquotas com cotação comercial considerando perfil do comprador (Cooperado Regular, Não Regular ou Mercado Geral).

3. **Calculadoras Estratégicas**:
   - **Preço e Imposto Destacado**: conversão automática de imposto "por dentro" para "por fora".
   - **Split Payment & Caixa**: simulação do impacto da retenção eletrônica imediata no fluxo de caixa e capital de giro.
   - **Cesta Básica Nacional × Imposto Seletivo**: comparador de produtos isentos e produtos sobretaxados.
   - **Diagnóstico de Regimes 2027+**: comparativo entre Simples Nacional, Lucro Presumido e Lucro Real.
   - **Produtor Rural e Crédito Presumido**: regras de pessoa física e crédito outorgado ao adquirente.

4. **Busca Rápida Global (`Ctrl + K`)**:
   - Localize instantaneamente produtos, códigos NCM, calculadoras, guias de aprendizagem e prazos da lei.

5. **Exportação Executiva Completa**:
   - Geração de relatórios e pareceres em **PDF formatado**, planilhas **Excel (.xlsx)** e arquivos **CSV**.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: [TanStack Start](https://tanstack.com/start) + [TanStack Router](https://tanstack.com/router)
- **Engine / Bundler**: [Vite](https://vitejs.dev/) + React 19 + TypeScript
- **Estilização**: Tailwind CSS v4 + Glassmorphism & Aurora UI Dark Mode
- **Componentes & UI**: Radix UI + Lucide Icons + Flaticon UIcons
- **Relatórios**: jsPDF + jsPDF-AutoTable + SheetJS (XLSX)

---

## 💻 Como Executar Localmente

### Pré-requisitos
- Node.js (v18+) ou Bun

### Instalação e Execução

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Gerar build de produção
npm run build
```

---

## ⚖️ Aviso Legal
As simulações apresentadas possuem caráter exclusivamente informativo, didático e de planejamento estratégico, utilizando alíquotas de referência oficiais publicadas nos estudos do Ministério da Fazenda e nos termos da Lei Complementar nº 214/2025. Não substituem consultoria contábil/tributária formal ou ferramentas oficiais da Receita Federal do Brasil.
