/**
 * Audio Stream Proxy Helper
 * 
 * Automatically routes HTTP audio URLs through an HTTPS proxy
 * to avoid mixed content issues on HTTPS sites.
 */

// Set this to your Cloudflare Worker URL after deployment
// Example: 'https://campus-fm-proxy.yourname.workers.dev'
// 
// TODO: Replace this with your actual Cloudflare Worker URL
const PROXY_BASE_URL = 'https://campus-fm-proxy.eric95lee.workers.dev/';

// Set to true to enable proxying, false to disable
const PROXY_ENABLED = true;

/**
 * Get the appropriate URL for an audio stream.
 * If the URL is HTTP and we're on an HTTPS site, route through proxy.
 * 
 * @param {string} audioUrl - The original audio URL
 * @returns {string} - The URL to use (proxied or original)
 */
export function getProxiedUrl(audioUrl) {
  if (!PROXY_ENABLED) {
    return audioUrl;
  }

  // Already HTTPS - no proxy needed
  if (audioUrl.startsWith('https://')) {
    return audioUrl;
  }

  // Check if we're on HTTPS (proxy only needed in production)
  const isHttpsSite = typeof window !== 'undefined' && window.location.protocol === 'https:';
  
  if (!isHttpsSite) {
    // Local development on HTTP - no proxy needed
    return audioUrl;
  }

  // Route HTTP URL through proxy
  return `${PROXY_BASE_URL}?url=${encodeURIComponent(audioUrl)}`;
}

/**
 * Check if a URL would need proxying
 */
export function needsProxy(audioUrl) {
  return audioUrl.startsWith('http://') && 
         typeof window !== 'undefined' && 
         window.location.protocol === 'https:';
}

export default getProxiedUrl;
