/**
 * Aparat hash / ID extractor.
 * Accepts:
 *  - bare hash:           akd5lfq
 *  - bare numeric ID:     2107794031550242816
 *  - /v/HASH              https://www.aparat.com/v/akd5lfq
 *  - /shorts/ID           https://www.aparat.com/shorts/2107794031550242816
 *  - embed URL            https://www.aparat.com/video/video/embed/videohash/akd5lfq/vt/frame
 *  - short link           https://aparat.com/akd5lfq
 * Returns null if nothing usable is found.
 */
export function extractAparatHash(input: string | undefined | null): string | null {
  if (!input) return null;
  const s = input.trim();
  if (s.length === 0) return null;

  // 1) Bare hash or numeric ID
  if (/^[a-zA-Z0-9]{4,30}$/.test(s)) return s;

  // 2) Embed URL: .../videohash/HASH/vt/frame
  const embedMatch = s.match(/videohash\/([^\/\?#]+)/i);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  // 3) Shorts URL: /shorts/ID
  const shortsMatch = s.match(/\/shorts\/([^\/\?#]+)/i);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  // 4) Regular video URL: /v/HASH
  const vMatch = s.match(/\/v\/([^\/\?#]+)/i);
  if (vMatch && vMatch[1]) return vMatch[1];

  // 5) Short link: aparat.com/HASH
  const shortMatch = s.match(/aparat\.com\/([a-zA-Z0-9]{4,30})\/?$/i);
  if (shortMatch && shortMatch[1] && shortMatch[1].toLowerCase() !== 'faq') {
    return shortMatch[1];
  }

  return null;
}

/**
 * Returns true if the input resolves to a usable Aparat video ID.
 */
export function isAparatHashValid(input: string | undefined | null): boolean {
  return extractAparatHash(input) !== null;
}

/**
 * Builds the Aparat embed URL for an iframe.
 * Works for regular videos, Shorts, and numeric IDs.
 */
export function buildAparatEmbedUrl(
  input: string | undefined | null,
  options: { autoplay?: boolean } = {}
): string | null {
  const hash = extractAparatHash(input);
  if (!hash) return null;
  const autoplay = options.autoplay ? '?autoplay=1' : '';
  return `https://www.aparat.com/video/video/embed/videohash/${hash}/vt/frame${autoplay}`;
}