import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ExternalLink, Newspaper } from "lucide-react";
import { Logo } from "@/components/logo";

const links = [
  { to: "/", label: "Início" },
  { to: "/simulador", label: "Simuladores" },
  { to: "/ferramentas", label: "Calculadoras" },
  { to: "/radar", label: "Radar de mudanças" },
  { to: "/aprender", label: "Aprender" },
] as const;

export function SiteNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-2.5 sm:px-6 sm:py-3.5 shadow-glass">
        {/* Logo Principal com Marca Vetorial */}
        <Link to="/" className="transition-transform hover:scale-[1.02]">
          <Logo size="md" />
        </Link>

        {/* Links de Navegação Desktop */}
        <div className="hidden items-center gap-6 lg:gap-8 text-sm font-medium text-muted-foreground md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-primary font-semibold" }}
              className="transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Link para Notícias em Tempo Real */}
        <div className="hidden items-center md:flex">
          <a
            href="https://www.cnnbrasil.com.br/tudo-sobre/reforma-tributaria/"
            target="_blank"
            rel="noreferrer noopener"
            className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-foreground ring-1 ring-border hover:bg-glass-strong hover:text-primary transition-all"
            title="Acompanhe as últimas notícias e atualizações sobre a Reforma Tributária"
          >
            <Newspaper className="size-3.5 text-primary" />
            <span>Notícias em Tempo Real</span>
            <ExternalLink className="size-3 text-muted-foreground" />
          </a>
        </div>

        {/* Controles Mobile (Hamburger) */}
        <div className="flex items-center gap-2 md:hidden">
          <a
            href="https://www.cnnbrasil.com.br/tudo-sobre/reforma-tributaria/"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1.5 text-xs font-semibold text-primary ring-1 ring-primary/25"
            title="Notícias em Tempo Real"
          >
            <span>Notícias</span>
            <ExternalLink className="size-2.5" />
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="grid size-9 place-items-center rounded-xl bg-background/60 text-foreground ring-1 ring-border"
            aria-label="Abrir Menu de Navegação"
          >
            <i
              className={`fi ${
                mobileMenuOpen ? "fi-br-cross" : "fi-rr-menu-burger"
              } text-sm leading-none`}
            />
          </button>
        </div>
      </nav>

      {/* Drawer / Menu Mobile */}
      {mobileMenuOpen && (
        <div className="glass mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl p-4 shadow-glass ring-1 ring-border md:hidden animate-scale-up space-y-2">
          <div className="grid gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileMenuOpen(false)}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "bg-primary/15 text-primary font-semibold" }}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-background/60"
              >
                <span>{l.label}</span>
                <i className="fi fi-rr-angle-small-right text-muted-foreground text-xs leading-none" />
              </Link>
            ))}
            <a
              href="https://www.cnnbrasil.com.br/tudo-sobre/reforma-tributaria/"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-primary hover:bg-background/60"
            >
              <span>Notícias em Tempo Real (CNN Brasil)</span>
              <ExternalLink className="size-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-16 bg-background/40">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
        <Logo size="md" showSubtitle />

        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="transition-colors hover:text-primary">
              {l.label}
            </Link>
          ))}
          <a
            href="https://www.cnnbrasil.com.br/tudo-sobre/reforma-tributaria/"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            <span>Notícias em Tempo Real</span>
            <ExternalLink className="size-3" />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-8">
        <p className="text-xs text-muted-foreground/70 leading-relaxed">
          <strong>Nexo Tributário:</strong> Plataforma de inteligência e simulação para a Reforma Tributária sobre o Consumo (LC nº 214/2025 e Decreto nº 12.955/2026).
          As projeções baseiam-se em alíquotas de referência oficiais e têm finalidade de planejamento e aprendizagem, não substituindo sistemas ou orientações formais da Receita Federal do Brasil.
        </p>
      </div>
    </footer>
  );
}
