/**
 * Manipulador padronizado de captura e telemetria de erros da aplicação Nexo Tributário.
 */

type ClientErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

export function reportClientError(
  error: unknown,
  context: Record<string, unknown> = {},
  options?: ClientErrorOptions,
) {
  if (typeof window === "undefined") return;

  const errorMessage =
    error instanceof Response
      ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);

  const stack = error instanceof Error ? error.stack : undefined;

  // Log detalhado em ambiente de desenvolvimento ou console do navegador
  if (import.meta.env?.DEV) {
    console.groupCollapsed?.(`[Nexo Tributário Error] ${errorMessage}`);
    console.error("Error Object:", error);
    console.info("Context:", context);
    console.info("Options:", options);
    if (stack) console.info("Stack Trace:", stack);
    console.groupEnd?.();
  } else {
    console.error(`[Nexo Tributário Error] ${errorMessage}`, { context, options });
  }
}
