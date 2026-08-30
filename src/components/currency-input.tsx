import { useEffect, useState } from "react";

export function formatBRLInput(val: number): string {
  if (!Number.isFinite(val) || val === 0) return "";
  return val.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function CurrencyInput({
  value,
  onChange,
  className = "",
  placeholder = "R$ 0,00",
  disabled = false,
  id,
}: {
  value: number;
  onChange: (val: number) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
}) {
  const [display, setDisplay] = useState<string>(() => formatBRLInput(value));

  // Sincroniza se o valor mudar externamente
  useEffect(() => {
    setDisplay(formatBRLInput(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Extrai apenas os dígitos
    const digits = raw.replace(/\D/g, "");

    if (!digits || digits === "0" || digits === "00") {
      setDisplay("");
      onChange(0);
      return;
    }

    const num = Number(digits) / 100;
    setDisplay(
      num.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    );
    onChange(num);
  };

  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      disabled={disabled}
      value={display}
      onChange={handleChange}
      placeholder={placeholder}
      className={className}
    />
  );
}

