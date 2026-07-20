interface FormatNumberOptions extends Intl.NumberFormatOptions {
  value: number;
}

export function formatNumber({
  value,
  notation = "compact",
  compactDisplay = "short",
  maximumFractionDigits = 1,
}: FormatNumberOptions) {
  return new Intl.NumberFormat("en", {
    notation,
    compactDisplay,
    maximumFractionDigits,
  }).format(value);
}
