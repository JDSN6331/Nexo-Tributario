/** Exportação de resultados das calculadoras e do simulador. */

export type ExportRow = {
  secao: string;
  campo: string;
  valor: string | number;
};

export type ExportPayload = {
  /** Nome base do arquivo, sem extensão. */
  nome: string;
  /** Título humano da ferramenta usada. */
  titulo: string;
  linhas: ExportRow[];
};

const HEADERS = ["Seção", "Campo", "Valor"] as const;

function timestamp() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}`;
}

function meta(payload: ExportPayload): ExportRow[] {
  return [
    { secao: "Metadados", campo: "Ferramenta", valor: payload.titulo },
    {
      secao: "Metadados",
      campo: "Gerado em",
      valor: new Date().toLocaleString("pt-BR"),
    },
    {
      secao: "Metadados",
      campo: "Observação",
      valor:
        "Estimativa educativa com alíquotas de referência. Não substitui a calculadora oficial da Receita Federal.",
    },
  ];
}

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function csvCell(v: string | number) {
  const s = String(v);
  return /[";\n]/.test(s) ? `"${s.replaceAll('"', '""')}"` : s;
}

export function exportCSV(payload: ExportPayload) {
  const rows = [...payload.linhas, ...meta(payload)];
  const body = [HEADERS, ...rows.map((r) => [r.secao, r.campo, r.valor])]
    .map((cols) => cols.map(csvCell).join(";"))
    .join("\r\n");
  // BOM para o Excel pt-BR reconhecer acentuação
  download(
    new Blob([`\uFEFF${body}`], { type: "text/csv;charset=utf-8" }),
    `${payload.nome}_${timestamp()}.csv`,
  );
}

export async function exportXLSX(payload: ExportPayload) {
  const XLSX = await import("xlsx");
  const rows = [...payload.linhas, ...meta(payload)];
  const aoa = [
    [...HEADERS],
    ...rows.map((r) => [r.secao, r.campo, r.valor] as (string | number)[]),
  ];
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  ws["!cols"] = [{ wch: 22 }, { wch: 46 }, { wch: 34 }];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Resultado");
  const out = XLSX.write(wb, { bookType: "xlsx", type: "array" }) as ArrayBuffer;
  download(
    new Blob([out], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    }),
    `${payload.nome}_${timestamp()}.xlsx`,
  );
}

export async function exportPDF(payload: ExportPayload) {
  const { jsPDF } = await import("jspdf");
  const { default: autoTable } = await import("jspdf-autotable");

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const dataFormatada = new Date().toLocaleString("pt-BR");

  // Barra de cabeçalho superior
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, "F");

  // Logo / Nome do App
  doc.setTextColor(45, 212, 191); // teal-400
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("NEXO TRIBUTÁRIO", 14, 12);

  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text("Inteligência em Reforma Tributária · LC 214/2025 & Agronegócio", 14, 18);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.text(`Gerado em: ${dataFormatada}`, pageWidth - 14, 15, { align: "right" });

  // Título da ferramenta
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(payload.titulo, 14, 38);

  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.text(
    "Relatório de simulação e estimativa para fins de planejamento e análise interna.",
    14,
    44,
  );

  // Tabela com autoTable
  const tableData = payload.linhas.map((row) => [row.secao, row.campo, String(row.valor)]);

  autoTable(doc, {
    startY: 50,
    head: [["Seção", "Campo / Métrica", "Valor"]],
    body: tableData,
    theme: "striped",
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 9.5,
      cellPadding: 3.5,
    },
    styles: {
      font: "helvetica",
      fontSize: 9,
      cellPadding: 3,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.1,
    },
    columnStyles: {
      0: { cellWidth: 42, fontStyle: "bold", textColor: [15, 118, 110] },
      1: { cellWidth: 88 },
      2: { cellWidth: 52, fontStyle: "bold", halign: "right" },
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    margin: { left: 14, right: 14, bottom: 25 },
  });

  // Rodapé do documento
  const pageCount = doc.internal.pages.length - 1;
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.setDrawColor(226, 232, 240);
    doc.line(14, pageHeight - 18, pageWidth - 14, pageHeight - 18);

    doc.setTextColor(148, 163, 184);
    doc.setFontSize(7.5);
    doc.text(
      "Documento exclusivamente informativo e educativo. Estimativas baseadas em alíquotas de referência que não substituem os sistemas oficiais da Receita Federal.",
      14,
      pageHeight - 12,
      { maxWidth: pageWidth - 45 },
    );

    doc.text(`Página ${i} de ${pageCount}`, pageWidth - 14, pageHeight - 12, {
      align: "right",
    });
  }

  doc.save(`${payload.nome}_${timestamp()}.pdf`);
}

