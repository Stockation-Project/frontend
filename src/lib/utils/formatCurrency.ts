// src/lib/utils/formatCurrency.ts

interface FormatCurrencyOptions {
  /** If true, uses Math.abs to strip negative sign from value */
  absolute?: boolean;
}

/**
 * Format a number to Indonesian Rupiah (IDR) currency format.
 *
 * @example
 * formatCurrencyIDR(12000)                     // "Rp12.000"
 * formatCurrencyIDR(-12000)                    // "-Rp12.000"
 * formatCurrencyIDR(-12000, { absolute: true }) // "Rp12.000"
 */
export function formatCurrencyIDR(
  value: number,
  options?: FormatCurrencyOptions
): string {
  const resolvedValue = options?.absolute ? Math.abs(value) : value;

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(resolvedValue);
}

/**
 * Format a number to a compact "Juta" (million) representation.
 * Useful for displaying abbreviated wallet/portfolio values.
 *
 * @example
 * formatJT(5000000)   // "5JT"
 * formatJT(50000000)  // "50JT"
 */
export function formatJT(value: number): string {
  return `${(value / 1_000_000).toLocaleString("id-ID")}JT`;
}
