const FA_DIGITS = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];

export function toFa(input: string | number | undefined | null): string {
  if (input === null || input === undefined) return '';
  return String(input).replace(/\d/g, d => FA_DIGITS[Number(d)]);
}

/**
 * Parse "45:20" (MM:SS), "1:22:00" (HH:MM:SS) or plain minutes (e.g. "82")
 * into a Persian human string: "۴۵ دقیقه" or "۱ ساعت و ۲۲ دقیقه"
 */
export function formatDuration(input: string | undefined | null): string {
  if (!input) return '';
  const s = String(input).trim();
  if (!s) return '';

  const parts = s.split(':').map(p => Number(p.trim())).filter(n => !isNaN(n));
  if (parts.length === 0) return '';

  let totalMinutes = 0;
  if (parts.length >= 3) {
    totalMinutes = parts[0] * 60 + parts[1] + (parts[2] >= 30 ? 1 : 0);
  } else if (parts.length === 2) {
    totalMinutes = parts[0] + (parts[1] >= 30 ? 1 : 0);
  } else {
    totalMinutes = parts[0];
  }

  if (totalMinutes <= 0) return '';
  if (totalMinutes < 60) {
    return `${toFa(totalMinutes)} دقیقه`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) return `${toFa(hours)} ساعت`;
  return `${toFa(hours)} ساعت و ${toFa(minutes)} دقیقه`;
}

/** Just converts digit characters to Farsi, keeping colons/dots. */
export function faDigits(input: string | undefined | null): string {
  if (!input) return '';
  return toFa(String(input));
}
