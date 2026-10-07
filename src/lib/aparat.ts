export function extractAparatHash(input: string | undefined | null): string | null {
  if (!input) return null;
  const s = input.trim();

  // Bare hash: akd5lfq
  if (/^[a-zA-Z0-9]{4,20}$/.test(s)) return s;

  // Embed URL: /videohash/HASH/vt/frame
  const embedMatch = s.match(/videohash\/([^\/\?#]+)/);
  if (embedMatch) return embedMatch[1];

  // /v/HASH
  const vMatch = s.match(/\/v\/([^\/\?#]+)/);
  if (vMatch) return vMatch[1];

  // Short link: aparat.com/HASH
  const shortMatch = s.match(/aparat\.com\/([a-zA-Z0-9]{4,15})\/?$/);
  if (shortMatch && shortMatch[1] !== 'faq') return shortMatch[1];

  return null;
}

export function isAparatHashValid(input: string | undefined | null): boolean {
  return extractAparatHash(input) !== null;
}