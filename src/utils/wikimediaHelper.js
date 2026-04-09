/**
 * Wikimedia Thumbnail URL Normalizer
 *
 * Wikimedia enforces a set of standard thumbnail widths via $wgThumbnailSteps.
 * Requests for non-standard sizes return HTTP 429.
 * See: https://www.mediawiki.org/wiki/Common_thumbnail_sizes
 *
 * This helper rewrites Wikimedia thumbnail URLs to use the nearest
 * allowed size so images load reliably.
 */

const STANDARD_THUMB_WIDTHS = [
  20, 40, 60, 120, 250, 330, 500, 960, 1280, 1920, 3840,
];

const WIKIMEDIA_THUMB_RE =
  /^(https?:\/\/upload\.wikimedia\.org\/wikipedia\/[^/]+\/thumb\/.+\/)(\d+)(px-.+)$/;

/**
 * If `url` is a Wikimedia thumbnail with a non-standard width, return a
 * corrected URL that uses the smallest allowed width ≥ the original.
 * All other URLs pass through unchanged.
 */
export function normalizeWikimediaThumbUrl(url) {
  if (!url) return url;

  const m = url.match(WIKIMEDIA_THUMB_RE);
  if (!m) return url;

  const requestedWidth = parseInt(m[2], 10);
  const standard =
    STANDARD_THUMB_WIDTHS.find((w) => w >= requestedWidth) ??
    STANDARD_THUMB_WIDTHS[STANDARD_THUMB_WIDTHS.length - 1];

  if (standard === requestedWidth) return url;

  return `${m[1]}${standard}${m[3]}`;
}
