export function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* 1. Orbe de Luz Superior Central (Teal suave) */}
      <div className="absolute -top-36 left-1/2 h-[550px] w-[1100px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/20 via-teal-500/10 to-transparent blur-[140px]" />

      {/* 2. Nebulosa Violeta / Púrpura à Esquerda (suavizada com transição em anil) */}
      <div className="absolute top-[18%] -left-52 h-[800px] w-[800px] rounded-full bg-gradient-to-tr from-purple-800/12 via-indigo-600/10 to-transparent blur-[180px] animate-pulse" />

      {/* 3. Nebulosa Ciano / Esmeralda à Direita (difusa e harmonizada) */}
      <div className="absolute top-[12%] -right-52 h-[800px] w-[800px] rounded-full bg-gradient-to-bl from-teal-500/14 via-emerald-500/8 to-transparent blur-[180px]" />

      {/* 4. Orbe de Fundo (Ponto neutro de fusão suave) */}
      <div className="absolute -bottom-48 left-1/2 h-[750px] w-[1000px] -translate-x-1/2 rounded-full bg-emerald-600/10 blur-[170px]" />

      {/* 5. Malha Geométrica Tech Dot-Grid com Máscara Radial */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(rgba(20, 184, 166, 0.5) 1.2px, transparent 1.2px), radial-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "48px 48px, 24px 24px",
          backgroundPosition: "0 0, 12px 12px",
          maskImage: "radial-gradient(ellipse 90% 80% at 50% 25%, black 45%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 80% at 50% 25%, black 45%, transparent 100%)",
        }}
      />

      {/* 6. Linha de Luz no Topo do Viewport */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>
  );
}
