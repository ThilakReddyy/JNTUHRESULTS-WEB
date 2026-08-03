export const formatResultMark = (value: unknown): string => {
  if (value === null || value === undefined) return "—";

  const displayValue = String(value).trim();
  if (displayValue === "") return "—";

  const numericValue = Number(displayValue);
  if (Number.isFinite(numericValue) && numericValue === 0) return "-";

  return displayValue;
};
