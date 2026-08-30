import { FC } from "react";

type LogoProps = {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showSubtitle?: boolean;
  className?: string;
};

export const LogoMark: FC<{ className?: string; size?: number }> = ({
  className = "size-9",
  size = 36,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Gradiente principal do Nexo */}
        <linearGradient id="nexoGrad1" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* Gradiente secundário violeta/índigo */}
        <linearGradient id="nexoGrad2" x1="44" y1="4" x2="4" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="70%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Glow filter suave */}
        <filter id="nexoGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Fundo suave translúcido */}
      <rect
        x="2"
        y="2"
        width="44"
        height="44"
        rx="13"
        fill="url(#nexoGrad1)"
        fillOpacity="0.12"
        stroke="url(#nexoGrad1)"
        strokeWidth="1.5"
        strokeOpacity="0.35"
      />

      {/* Formas Geométricas do Nexo (Prisma / Fita de Convergência Dual) */}
      <g filter="url(#nexoGlow)">
        {/* Faceta Superior / Esquerda */}
        <path
          d="M24 8L37 15.5V30.5L24 38L11 30.5V15.5L24 8Z"
          stroke="url(#nexoGrad1)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Linhas de Conexão Internas (Convergência Tributária IBS + CBS) */}
        <path
          d="M24 8V24L37 30.5"
          stroke="url(#nexoGrad2)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 24L11 30.5"
          stroke="url(#nexoGrad1)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Núcleo Central de Inteligência */}
        <circle cx="24" cy="24" r="3.5" fill="#34d399" />
        <circle cx="24" cy="24" r="1.5" fill="#0f172a" />

        {/* Nós satélites nos vértices principais */}
        <circle cx="24" cy="8" r="2" fill="#38bdf8" />
        <circle cx="37" cy="30.5" r="2" fill="#34d399" />
        <circle cx="11" cy="30.5" r="2" fill="#818cf8" />
      </g>
    </svg>
  );
};

export function Logo({
  size = "md",
  showText = true,
  showSubtitle = false,
  className = "",
}: LogoProps) {
  const markSize =
    size === "sm" ? "size-7" : size === "md" ? "size-9" : size === "lg" ? "size-11" : "size-14";
  const numSize = size === "sm" ? 28 : size === "md" ? 36 : size === "lg" ? 44 : 56;

  const textClass =
    size === "sm"
      ? "text-sm"
      : size === "md"
      ? "text-base sm:text-lg"
      : size === "lg"
      ? "text-xl sm:text-2xl"
      : "text-2xl sm:text-3xl";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markSize} size={numSize} />

      {showText && (
        <div className="flex flex-col">
          <div className={`font-display font-bold tracking-tight text-foreground ${textClass}`}>
            Nexo <span className="text-primary font-semibold">Tributário</span>
          </div>
          {showSubtitle && (
            <span className="text-[10px] sm:text-xs font-medium tracking-wide text-muted-foreground">
              Inteligência Fiscal & Agro
            </span>
          )}
        </div>
      )}
    </div>
  );
}
