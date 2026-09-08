import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  Calculator,
  Layers,
  Zap,
  ShoppingBasket,
  Scale,
  Wallet,
  Sprout,
  BookOpen,
  Radar,
  Home,
  FileSpreadsheet,
  Wheat,
  Factory,
} from "lucide-react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

export function openGlobalSearch() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-global-search"));
  }
}

export function GlobalSearchDialog() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    const handleCustomOpen = () => setOpen(true);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-global-search", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-global-search", handleCustomOpen);
    };
  }, []);

  const handleSelect = useCallback(
    (action: () => void) => {
      setOpen(false);
      action();
    },
    []
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Buscar calculadoras, NCM, SKU, conceitos ou leis..." />
      <CommandList className="max-h-[380px] p-2">
        <CommandEmpty>Nenhum resultado encontrado para o termo digitado.</CommandEmpty>

        {/* NAVEGAÇÃO PRINCIPAL */}
        <CommandGroup heading="Módulos & Páginas">
          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/" }))
            }
          >
            <Home className="mr-2 size-4 text-primary" />
            <span>Visão Geral & Antes e Depois</span>
            <CommandShortcut>Início</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/simulador" }))
            }
          >
            <Calculator className="mr-2 size-4 text-primary" />
            <span>Simulador Corporativo da Transição (2026–2033)</span>
            <CommandShortcut>/simulador</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() =>
                navigate({ to: "/simulador", search: () => ({ tab: "agro" }) as any })
              )
            }
          >
            <Sprout className="mr-2 size-4 text-emerald-400" />
            <span>Motor Agropecuário & NCMs Cooxupé (30k itens)</span>
            <CommandShortcut>Agro</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/ferramentas" }))
            }
          >
            <Zap className="mr-2 size-4 text-amber-400" />
            <span>Calculadoras Rápidas & Estratégicas</span>
            <CommandShortcut>/ferramentas</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/radar" }))
            }
          >
            <Radar className="mr-2 size-4 text-primary" />
            <span>Radar de Mudanças & Checklist Regulatório</span>
            <CommandShortcut>/radar</CommandShortcut>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/aprender" }))
            }
          >
            <BookOpen className="mr-2 size-4 text-primary" />
            <span>Base de Conhecimento, Glossário e FAQ</span>
            <CommandShortcut>/aprender</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-1" />

        {/* CALCULADORAS ESPECIALIZADAS */}
        <CommandGroup heading="Calculadoras Especializadas">
          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/ferramentas" }))
            }
          >
            <Calculator className="mr-2 size-4 text-primary" />
            <span>Preço Destacado (Cálculo Por Dentro vs Por Fora)</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/ferramentas" }))
            }
          >
            <Layers className="mr-2 size-4 text-cyan-400" />
            <span>Crédito Financeiro Pleno (Fim do Efeito Cascata)</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/ferramentas" }))
            }
          >
            <Zap className="mr-2 size-4 text-amber-400" />
            <span>Split Payment & Impacto no Capital de Giro</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/ferramentas" }))
            }
          >
            <ShoppingBasket className="mr-2 size-4 text-emerald-400" />
            <span>Cesta Básica Nacional (Alíquota Zero) & Imposto Seletivo</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/ferramentas" }))
            }
          >
            <Scale className="mr-2 size-4 text-purple-400" />
            <span>Diagnóstico Simples Nacional 2027+ (Guia Única vs Crédito B2B)</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/ferramentas" }))
            }
          >
            <Wallet className="mr-2 size-4 text-blue-400" />
            <span>Impacto no Faturamento & Elasticidade de Margem</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/ferramentas" }))
            }
          >
            <Wheat className="mr-2 size-4 text-amber-500" />
            <span>Produtor Rural PF & Crédito Presumido (Art. 281 LC 214)</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-1" />

        {/* CATÁLOGO AGROPECUÁRIO & NCM */}
        <CommandGroup heading="Catálogo Agropecuário & NCMs (Anexo IX LC 214)">
          <CommandItem
            onSelect={() =>
              handleSelect(() =>
                navigate({ to: "/simulador", search: () => ({ tab: "agro" }) as any })
              )
            }
          >
            <Sprout className="mr-2 size-4 text-emerald-400" />
            <span>Fertilizantes & Fórmulas NPK (NCM Capítulo 31 - Redução 60%)</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() =>
                navigate({ to: "/simulador", search: () => ({ tab: "agro" }) as any })
              )
            }
          >
            <Sprout className="mr-2 size-4 text-emerald-400" />
            <span>Defensivos Químicos: Fungicidas e Inseticidas (NCM 3808)</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() =>
                navigate({ to: "/simulador", search: () => ({ tab: "agro" }) as any })
              )
            }
          >
            <Sprout className="mr-2 size-4 text-emerald-500" />
            <span>Bioinsumos & Defensivos Biológicos (Alíquota Zero 0%)</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() =>
                navigate({ to: "/simulador", search: () => ({ tab: "agro" }) as any })
              )
            }
          >
            <Factory className="mr-2 size-4 text-blue-400" />
            <span>Máquinas, Tratores & Secadores de Café (NCM 84/87 - Bens de Capital)</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() =>
                navigate({ to: "/simulador", search: () => ({ tab: "agro" }) as any })
              )
            }
          >
            <FileSpreadsheet className="mr-2 size-4 text-primary" />
            <span>Silos Metálicos & Tulhas para Armazenagem (NCM 7309)</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator className="my-1" />

        {/* CONCEITOS & GLOSSÁRIO */}
        <CommandGroup heading="Conceitos & Regras Fundamentais">
          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/aprender" }))
            }
          >
            <BookOpen className="mr-2 size-4 text-primary" />
            <span>IVA Dual: CBS (Federal) + IBS (Subnacional)</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/aprender" }))
            }
          >
            <BookOpen className="mr-2 size-4 text-primary" />
            <span>Ato Cooperativo (Art. 271, II da LC 214/2025 - Alíquota Zero)</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/aprender" }))
            }
          >
            <BookOpen className="mr-2 size-4 text-primary" />
            <span>Princípio do Destino (Fim da Guerra Fiscal Interestadual)</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/aprender" }))
            }
          >
            <BookOpen className="mr-2 size-4 text-primary" />
            <span>Cashback Tributário (Devolução de tributos para baixa renda)</span>
          </CommandItem>

          <CommandItem
            onSelect={() =>
              handleSelect(() => navigate({ to: "/radar" }))
            }
          >
            <Radar className="mr-2 size-4 text-primary" />
            <span>Comitê Gestor do IBS (CGIBS - Governança e Partilha)</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
