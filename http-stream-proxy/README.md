# Audio Stream Proxy

Campus FM uses a Cloudflare Worker to proxy HTTP audio streams through HTTPS, solving the mixed content problem that prevents HTTP streams from playing on HTTPS websites.

## Why This Exists

Many college radio stations run Icecast/Shoutcast servers that only support HTTP. When Campus FM is served over HTTPS (as all modern sites should be), browsers block these "mixed content" requests. This proxy acts as an HTTPS middleman.

```
Browser (HTTPS) → Cloudflare Worker (HTTPS) → Radio Station (HTTP) → Audio
```

## Architecture

- **`worker.js`** - Cloudflare Worker that fetches HTTP streams and serves them over HTTPS
- **`src/utils/proxyHelper.js`** - Client-side helper that automatically routes HTTP URLs through the proxy

The proxy only activates when:
1. The app is running on HTTPS (not localhost)
2. The audio URL is HTTP (not already HTTPS)

## Security

The worker includes two whitelists to prevent abuse:

1. **`ALLOWED_STREAM_HOSTS`** - Only these radio station domains can be proxied
2. **`ALLOWED_ORIGINS`** - Only these domains can make requests to the proxy

This prevents the worker from being used as an open proxy.

## Configuration

### Proxy URL

Set in `src/utils/proxyHelper.js`:

```javascript
const PROXY_BASE_URL = 'https://campus-fm-proxy.example.workers.dev';
```

**Using a custom domain (recommended):** The default `*.yourname.workers.dev` URL exposes your Cloudflare account subdomain in network requests. To hide it:

1. In Cloudflare: **Workers & Pages** → your proxy worker → **Settings** → **Domains & Routes**
2. Click **Add** under Custom Domains and enter a subdomain (e.g. `proxy.campus-fm.com`). The zone (e.g. `campus-fm.com`) must already be on Cloudflare.
3. Update `PROXY_BASE_URL` in `src/utils/proxyHelper.js` to `https://proxy.campus-fm.com/`
4. Optionally: disable the `workers.dev` route for this worker so it’s only reachable via the custom domain

### Allowed Hosts

HTTP station hostnames must be whitelisted in `worker.js`:

```javascript
const ALLOWED_STREAM_HOSTS = [
  'kwvaradio.uoregon.edu',
  'voice.wvfs.fsu.edu',
  // ... etc
];
```

### Allowed Origins

Domains that can use the proxy, also in `worker.js`:

```javascript
const ALLOWED_ORIGINS = [
  'https://campus-fm.com',
  'http://localhost:3000',
];
```

## Deployment

The worker is deployed to Cloudflare Workers (free tier: 100k requests/day).

1. Create a Cloudflare account at [dash.cloudflare.com](https://dash.cloudflare.com)
2. Go to **Workers & Pages** → **Create Worker**
3. Paste the contents of `worker.js`
4. Deploy and note the worker URL
5. Update `PROXY_BASE_URL` in the app

## Adding New HTTP Stations

When adding a station that only supports HTTP:

1. Add the hostname to `ALLOWED_STREAM_HOSTS` in `worker.js`
2. Redeploy the worker
3. The station will automatically be proxied

## Monitoring

Cloudflare dashboard shows:
- Request volume
- Success/error rates
- Geographic distribution
- Response times

## Limitations

- Free tier: 100k requests/day (sufficient for typical usage)
- Each listener = 1 request (streams are long-lived connections)
- Some stations may block proxy requests (rare)
