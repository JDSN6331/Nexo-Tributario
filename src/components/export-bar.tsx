import { useState } from "react";
import { Download, FileDown, FileSpreadsheet, FileText } from "lucide-react";
import { exportCSV, exportPDF, exportXLSX, type ExportPayload } from "@/lib/export";

export function ExportBar({
  payload,
  hint = "Baixe os números desta simulação para o seu controle interno.",
}: {
  payload: ExportPayload;
  hint?: string;
}) {
  const [ocupadoXlsx, setOcupadoXlsx] = useState(false);
  const [ocupadoPdf, setOcupadoPdf] = useState(false);

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 rounded-2xl bg-background/40 p-4 ring-1 ring-border">
      <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary ring-1 ring-primary/25">
        <Download className="size-4" />
      </span>
      <p className="min-w-[14ch] flex-1 text-xs leading-relaxed text-muted-foreground">{hint}</p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => exportCSV(payload)}
          className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-glass-strong"
        >
          <FileText className="size-3.5 text-primary" />
          CSV
        </button>
        <button
          type="button"
          disabled={ocupadoXlsx}
          onClick={async () => {
            setOcupadoXlsx(true);
            try {
              await exportXLSX(payload);
            } finally {
              setOcupadoXlsx(false);
            }
          }}
          className="glass inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors hover:bg-glass-strong disabled:opacity-60"
        >
          <FileSpreadsheet className="size-3.5 text-primary" />
          {ocupadoXlsx ? "Gerando…" : "Excel"}
        </button>
        <button
          type="button"
          disabled={ocupadoPdf}
          onClick={async () => {
            setOcupadoPdf(true);
            try {
              await exportPDF(payload);
            } finally {
              setOcupadoPdf(false);
            }
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-all hover:shadow-[0_0_20px_var(--color-glow)] disabled:opacity-60"
        >
          <FileDown className="size-3.5" />
          {ocupadoPdf ? "Gerando…" : "PDF"}
        </button>
      </div>
    </div>
  );
}
