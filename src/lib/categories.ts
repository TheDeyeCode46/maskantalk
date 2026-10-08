/**
 * Normalize a category string:
 * - Remove zero-width characters (ZWNJ, ZWJ, ZWSP, BOM)
 * - Trim whitespace
 */
export function normCat(c: string | undefined | null): string {
  return String(c ?? '').replace(/[\u200b\u200c\u200d\ufeff]/g, '').trim();
}
