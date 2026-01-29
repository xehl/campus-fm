# Campus FM - Agent Guide

This document helps AI agents understand and work with the Campus FM codebase.

## Project Overview

Campus FM is a web app that aggregates college radio station streams, letting users listen to student-run radio from universities across North America. Built with React and Material-UI.

**Live site**: https://campus-fm.com

## Key Architecture

```
campus-fm/
├── src/
│   ├── stations.js          # Station database (THE source of truth)
│   ├── App.js                # Main app component, retry logic
│   ├── components/
│   │   ├── stationcard.jsx   # Individual station cards + audio elements
│   │   ├── selectormodal.jsx # Station picker modal
│   │   └── ...
│   └── utils/
│       └── proxyHelper.js    # HTTP→HTTPS proxy routing
├── http-stream-proxy/
│   ├── worker.js             # Cloudflare Worker for proxying HTTP streams
│   └── README.md             # Proxy documentation
├── utils/
│   └── test-streams.js       # Stream testing CLI tool
└── public/                   # Static assets, station logos
```

## Station Data Structure

Each station in `src/stations.js` has this shape:

```javascript
{
  id: 123,
  call_sign: "WXYZ",           // Unique identifier, uppercase
  broadcast_frequency: "91.5",  // FM frequency
  audio_url: "https://...",     // Direct stream URL (critical!)
  station_url: "https://...",   // Station website
  college_name: "University of Example",
  public_private: "Public",
  city: "City",
  state: "ST",
  station_image: "https://...", // Station logo
  college_image: "https://..."  // College logo
}
```

## Common Issues & Solutions

### 1. Stream Not Playing

**Symptoms**: Station card stays dimmed, console shows network errors

**Diagnosis**:
```bash
# Test the specific station
node utils/test-streams.js --station WXYZ
```

**Common causes**:
- **Link rot**: Station changed their streaming URL
- **Mixed content**: HTTP URL on HTTPS site (needs proxy)
- **CORS**: Stream server blocks cross-origin requests
- **Rate limiting**: Server blocking too many requests (429)
- **Dead station**: Station stopped streaming entirely

### 2. HTTP vs HTTPS (Mixed Content)

When the app runs on HTTPS, browsers block HTTP audio streams. Solutions:

1. **Best**: Find HTTPS version of the stream URL
2. **Fallback**: Route through the Cloudflare proxy

The `proxyHelper.js` automatically routes HTTP URLs through the proxy when on HTTPS.

### 3. Finding New Stream URLs

When a station's URL breaks:

1. Check the station's website for an embedded player
2. Open browser DevTools → Network tab → filter by "media"
3. Play their stream and look for the actual stream URL
4. Common patterns:
   - `https://playerservices.streamtheworld.com/api/livestream-redirect/CALLSIGN.mp3`
   - `https://stream.stationname.org/listen`
   - `https://ice*.securenetsystems.net/CALLSIGN`
   - `https://listen.mixlr.com/<hash>`

## Proxy System

### How It Works

```
Browser → proxyHelper.js (detects HTTP URL on HTTPS site)
       → Cloudflare Worker (http-stream-proxy/worker.js)
       → HTTP stream server
       → Audio back through worker
       → Browser plays audio
```

### Proxy Configuration

- **Worker URL**: Set in `src/utils/proxyHelper.js` → `PROXY_BASE_URL`
- **Allowed hosts**: Whitelist in `http-stream-proxy/worker.js` → `ALLOWED_STREAM_HOSTS`
- **Allowed origins**: Set in `http-stream-proxy/worker.js` → `ALLOWED_ORIGINS`

### Adding a New HTTP Station to Proxy

1. Add the hostname to `ALLOWED_STREAM_HOSTS` in `http-stream-proxy/worker.js`
2. Redeploy the Cloudflare Worker

## Testing Tools

### Stream Tester CLI

```bash
# Test all stations (takes a while)
node utils/test-streams.js --all

# Test single station
node utils/test-streams.js --station KWVA

# Test multiple stations
node utils/test-streams.js --stations "KWVA,WXYC,KALX"

# Test only HTTP stations (proxy candidates)
node utils/test-streams.js --http-only

# Get JSON output for programmatic use
node utils/test-streams.js --all --json

# Show only broken stations
node utils/test-streams.js --all --broken-only
```

### Output Statuses

| Status | Meaning |
|--------|---------|
| `OK` | Stream works over HTTPS |
| `NEEDS_PROXY` | HTTP only, must use proxy |
| `UPGRADE_AVAILABLE` | HTTP URL but HTTPS also works (update the URL!) |
| `BROKEN` | Stream URL not reachable |
| `UNKNOWN` | Reachable but not recognized as audio |

## Common Maintenance Tasks

### Adding a New Station

1. Find the direct stream URL (not a webpage with a player)
2. Verify it works: `curl -I "https://stream.url/here"`
3. Add entry to `src/stations.js` with all required fields
4. If HTTP-only, add hostname to proxy whitelist

### Fixing a Broken Station

1. Run: `node utils/test-streams.js --station CALLSIGN`
2. If broken, search for new URL (see "Finding New Stream URLs")
3. Test new URL: `curl -I "https://new.url/here"`
4. Update `audio_url` in `stations.js`
5. If switching from HTTPS to HTTP, add to proxy whitelist

### Commenting Out a Station

When a station is permanently broken:

```javascript
// NOTE: WXYZ commented out - reason here
// {
//   id: 123,
//   call_sign: "WXYZ",
//   ...
// },
```

### Bulk Testing After Changes

```bash
# Quick check on all stations
node utils/test-streams.js --all --quiet

# Full report
node utils/test-streams.js --all

# Just see what's broken
node utils/test-streams.js --all --broken-only
```

## Retry Logic

The app has built-in retry logic in `App.js`:

- Checks for failed stations every 8 seconds
- Uses exponential backoff (8s → 16s → 32s → 64s → 128s)
- Max 5 retries per station, then gives up
- Resets if station successfully loads

This prevents hammering broken streams while allowing recovery from temporary failures.

## File Quick Reference

| File | Purpose |
|------|---------|
| `src/stations.js` | Station database - edit to add/fix/remove stations |
| `src/App.js` | Main app, retry logic |
| `src/components/stationcard.jsx` | Station UI, audio playback |
| `src/utils/proxyHelper.js` | Routes HTTP streams through proxy |
| `http-stream-proxy/worker.js` | Cloudflare Worker code for proxy |
| `utils/test-streams.js` | CLI for testing stream URLs |

## Debugging Checklist

When a station doesn't work:

- [ ] Check browser console for errors
- [ ] Run `node utils/test-streams.js --station CALLSIGN`
- [ ] If HTTP URL, check if HTTPS version works
- [ ] If HTTP-only, verify hostname is in proxy whitelist
- [ ] If 404/connection error, find new stream URL
- [ ] If CORS error, may need to find alternative URL
- [ ] If 429, station is rate-limiting (try again later or find alt URL)
