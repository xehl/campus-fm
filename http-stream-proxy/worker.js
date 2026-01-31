/**
 * Cloudflare Worker - HTTPS to HTTP Audio Stream Proxy
 * 
 * Deploy to Cloudflare Workers (free tier: 100k requests/day)
 * 
 * Usage: https://your-worker.workers.dev/?url=http://example.com/stream
 * 
 * Setup:
 * 1. Create a Cloudflare account (free)
 * 2. Go to Workers & Pages > Create Worker
 * 3. Paste this code
 * 4. Deploy
 * 5. Update ALLOWED_ORIGINS with your domain
 */

// Whitelist of allowed stream domains (security - prevent open proxy abuse)
// Generated from stations.js - all HTTP stream hosts
const ALLOWED_STREAM_HOSTS = [
  'n0a.radiojar.com',
  'netcast.kfjc.org',
  'voice.wvfs.fsu.edu',
  'wtbu.bu.edu',
  'icecast.uvm.edu',
  'kwvaradio.uoregon.edu',
  'stream.whus.org',
  'streaming.wrek.org',
  '129.81.156.83',
  'ktcustream01.is.tcu.edu',
  'cp12.shoutcheap.com',
  'kure-network.stuorg.iastate.edu',
  'weeping.wxdu.duke.edu',
  'rsc417c1.rutgers.edu',
  '128.175.76.123',
  '27033.live.streamtheworld.com',
  'krui.student-services.uiowa.edu',
  'radiokstreams.cce.umn.edu',
  'audio.wpts.pitt.edu',
  'webstream.wmfo.org',
  '137.22.31.174',
  's9.viastreaming.net',
  '144.80.16.164',
  'audio.cfrc.ca',
  'wber-ice-encoder.monroe.edu',
  'www.golden-apple.com',
  'dvstream2.bgsu.edu',
  'wsuw-test.uww.edu',
  'kdurradio.fortlewis.edu',
  'icecast.commedia.org.uk',
  '137.165.206.193',
  'stream.wrct.org',
  '205.208.30.113',
  'widrfm.net',
  'wixq.millersville.edu',
  '130.74.34.21',
  '138.23.75.92',
  'kunv.oit.unlv.edu',
  '152.17.49.84',
  'wmeb-stream.maine.edu',
  'wnyu.org',
];

// Origins allowed to use this proxy (no localhost = no open use by others)
const ALLOWED_ORIGINS = [
  'https://campus-fm.com',
  'https://www.campus-fm.com',
];

export default {
  async fetch(request, env, ctx) {
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleCORS(request);
    }

    const url = new URL(request.url);
    const streamUrl = url.searchParams.get('url');

    // Validate request
    if (!streamUrl) {
      return new Response('Missing ?url= parameter', { status: 400 });
    }

    let parsedStreamUrl;
    try {
      parsedStreamUrl = new URL(streamUrl);
    } catch {
      return new Response('Invalid URL', { status: 400 });
    }

    // Security: Only allow whitelisted hosts
    if (!ALLOWED_STREAM_HOSTS.includes(parsedStreamUrl.hostname)) {
      return new Response(`Host not allowed: ${parsedStreamUrl.hostname}`, { status: 403 });
    }

    // Security: Only proxy HTTP streams (that's the whole point)
    if (parsedStreamUrl.protocol !== 'http:') {
      return new Response('Only HTTP URLs can be proxied', { status: 400 });
    }

    try {
      // Fetch the audio stream
      const response = await fetch(streamUrl, {
        headers: {
          'User-Agent': 'CampusFM-Proxy/1.0',
          'Accept': '*/*',
        },
      });

      if (!response.ok) {
        return new Response(`Upstream error: ${response.status}`, { status: 502 });
      }

      // Create response with CORS headers
      const headers = new Headers();
      headers.set('Access-Control-Allow-Origin', getAllowedOrigin(request));
      headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
      headers.set('Content-Type', response.headers.get('Content-Type') || 'audio/mpeg');
      headers.set('Cache-Control', 'no-cache, no-store');
      
      // Stream the response
      return new Response(response.body, {
        status: 200,
        headers,
      });

    } catch (error) {
      return new Response(`Proxy error: ${error.message}`, { status: 500 });
    }
  },
};

function handleCORS(request) {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': getAllowedOrigin(request),
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}

function getAllowedOrigin(request) {
  const origin = request.headers.get('Origin');
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return origin;
  }
  return ALLOWED_ORIGINS[0]; // Default
}
