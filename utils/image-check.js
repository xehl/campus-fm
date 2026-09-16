#!/usr/bin/env node
/**
 * Campus FM Image Link Checker
 *
 * Checks every station_image and college_image URL in the station database
 * to confirm they're reachable and return proper image content.
 *
 * Usage:
 *   node utils/image-check.js                          # Check all images
 *   node utils/image-check.js --json                   # JSON output
 *   node utils/image-check.js --broken-only            # Show only broken links
 *   node utils/image-check.js --station KWVA,WXYC      # Check specific stations
 *   node utils/image-check.js --quiet                  # Minimal output
 *   node utils/image-check.js --help                   # Show help
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ============================================================================
// Configuration
// ============================================================================

const TIMEOUT = 10000; // 10s per request
const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/avif', 'image/bmp'];

// ============================================================================
// Station Loading
// ============================================================================

function loadStations() {
  const stationsPath = path.join(__dirname, '../src/stations.js');
  const content = fs.readFileSync(stationsPath, 'utf-8');

  const match = content.match(/const stations = (\[[\s\S]*?\n\s*\]);/);
  if (!match) throw new Error('Could not parse stations array from stations.js');

  return new Function(`return ${match[1]}`)();
}

// ============================================================================
// Image Testing
// ============================================================================

function testImageUrl(url, timeout = TIMEOUT) {
  return new Promise((resolve) => {
    const startTime = Date.now();

    try {
      const isHttps = url.startsWith('https://');
      const client = isHttps ? https : http;

      const req = client.request(url, {
        method: 'HEAD',
        timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': '*/*',
        }
      }, (res) => {
        const responseTime = Date.now() - startTime;

        // Handle redirects — follow one level
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const redirectUrl = res.headers.location.startsWith('http')
            ? res.headers.location
            : new URL(res.headers.location, url).href;
          res.destroy();
          // Test the redirect target
          testImageUrlRaw(redirectUrl, timeout).then(resolve);
          return;
        }

        const contentType = res.headers['content-type']?.split(';')[0]?.trim();
        const contentLength = parseInt(res.headers['content-length'] || '0', 10);
        const isImage = VALID_IMAGE_TYPES.some(t => contentType?.includes(t));
        const reached = res.statusCode >= 200 && res.statusCode < 400;

        res.destroy();
        resolve({
          reachable: reached,
          statusCode: res.statusCode,
          contentType: contentType || null,
          isImage,
          contentLength,
          responseTime,
          protocol: isHttps ? 'https' : 'http',
          recommendation: !reached
            ? `HTTP ${res.statusCode}`
            : !isImage
              ? `Content-Type "${contentType}" is not an image type`
              : contentLength === 0
                ? 'Content-Length is 0 — likely a placeholder or dead endpoint'
                : null,
        });
      });

      req.on('error', (err) => {
        resolve({
          reachable: false,
          error: err.code || err.message,
          responseTime: Date.now() - startTime,
          protocol: isHttps ? 'https' : 'http',
          recommendation: `Connection failed: ${err.code || err.message}`,
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          reachable: false,
          error: 'TIMEOUT',
          statusCode: null,
          responseTime: timeout,
          protocol: isHttps ? 'https' : 'http',
          recommendation: `Request timed out after ${timeout}ms`,
        });
      });

      req.end();
    } catch (err) {
      resolve({
        reachable: false,
        error: err.message,
        responseTime: Date.now() - startTime,
        protocol: null,
        recommendation: `Failed to create request: ${err.message}`,
      });
    }
  });
}

// Raw GET fallback for redirect targets (HEAD not always supported on redirect targets)
function testImageUrlRaw(url, timeout = TIMEOUT) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const isHttps = url.startsWith('https://');
    const client = isHttps ? https : http;

    const req = client.request(url, {
      method: 'GET',
      timeout,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': '*/*',
        'Range': 'bytes=0-0',
      }
    }, (res) => {
      const responseTime = Date.now() - startTime;
      const contentType = res.headers['content-type']?.split(';')[0]?.trim();
      const contentLength = parseInt(res.headers['content-length'] || '0', 10);
      const isImage = VALID_IMAGE_TYPES.some(t => contentType?.includes(t));

      res.destroy();
      resolve({
        reachable: res.statusCode >= 200 && res.statusCode < 400,
        statusCode: res.statusCode,
        contentType: contentType || null,
        isImage,
        contentLength,
        responseTime,
        protocol: isHttps ? 'https' : 'http',
        recommendation: res.statusCode >= 400
          ? `HTTP ${res.statusCode}`
          : !isImage
            ? `Content-Type "${contentType}" is not an image type`
            : null,
      });
    });

    req.on('error', (err) => resolve({
      reachable: false,
      error: err.code || err.message,
      responseTime: Date.now() - startTime,
      protocol: isHttps ? 'https' : 'http',
      recommendation: `Connection failed: ${err.code || err.message}`,
    }));

    req.on('timeout', () => {
      req.destroy();
      resolve({ reachable: false, error: 'TIMEOUT', responseTime: timeout, protocol: isHttps ? 'https' : 'http', recommendation: `Timed out after ${timeout}ms` });
    });

    req.end();
  });
}

// ============================================================================
// Reporting
// ============================================================================

function formatHumanReadable(results) {
  const broken = results.filter(r => !r.imageOk || r.stationImageError || r.collegeImageError);
  const healthy = results.filter(r => r.imageOk);

  let output = '';
  output += `Image Health Check — ${new Date().toLocaleString()}\n`;
  output += `${'='.repeat(50)}\n`;
  output += `Total stations: ${results.length}\n`;
  output += `  ✅ All images OK: ${healthy.length}\n`;
  output += `  ❌ Issues found:   ${broken.length}\n\n`;

  if (broken.length > 0) {
    output += `Stations with broken images:\n`;
    output += `${'-'.repeat(50)}\n`;
    for (const st of broken) {
      output += `\n${st.call_sign} — ${st.college_name}\n`;
      if (st.stationImageError) {
        output += `  Station image: ❌ ${st.station_image}\n`;
        output += `    ${st.stationImageError}\n`;
      } else {
        output += `  Station image: ✅\n`;
      }
      if (st.collegeImageError) {
        output += `  College image: ❌ ${st.college_image}\n`;
        output += `    ${st.collegeImageError}\n`;
      } else {
        output += `  College image: ✅\n`;
      }
    }
  }

  return output;
}

// ============================================================================
// CLI
// ============================================================================

function parseArgs() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Usage: node utils/image-check.js [options]

Options:
  --json                  Output as JSON
  --broken-only           Only show stations with broken images
  --quiet                 Minimal output
  --station CALLSIGNS     Comma-separated list of call signs to check
  --help, -h              Show this help

Examples:
  node utils/image-check.js
  node utils/image-check.js --json
  node utils/image-check.js --broken-only
  node utils/image-check.js --station KWVA,WXYC
`);
    process.exit(0);
  }

  return {
    outputJson: args.includes('--json'),
    brokenOnly: args.includes('--broken-only'),
    quietMode: args.includes('--quiet'),
    stationFilter: (() => {
      const idx = args.indexOf('--station');
      return idx !== -1 && args[idx + 1] ? args[idx + 1].toUpperCase().split(',') : null;
    })(),
  };
}

// ============================================================================
// Main
// ============================================================================

async function main() {
  const { outputJson, brokenOnly, quietMode, stationFilter } = parseArgs();
  const stations = loadStations().filter(s => {
    if (!stationFilter) return true;
    return stationFilter.includes(s.call_sign);
  });

  if (!stations.length) {
    console.log('No stations to check.');
    process.exit(0);
  }

  if (!quietMode) {
    console.log(`Checking ${stations.length} station(s)...\n`);
  }

  const results = [];
  for (let i = 0; i < stations.length; i++) {
    const station = stations[i];
    if (!quietMode) {
      process.stdout.write(`[${i + 1}/${stations.length}] ${station.call_sign}... `);
    }

    const result = {
      id: station.id,
      call_sign: station.call_sign,
      college_name: station.college_name,
      station_image: station.station_image,
      college_image: station.college_image,
      imageOk: true,
      stationImageError: null,
      collegeImageError: null,
      stationImageDetail: null,
      collegeImageDetail: null,
    };

    // Small delay to avoid rate limiting (Wikimedia etc.)
    await new Promise(r => setTimeout(r, 300));

    // Check station image
    if (station.station_image) {
      const imgResult = await testImageUrl(station.station_image);
      result.stationImageDetail = imgResult;
      if (!imgResult.reachable || !imgResult.isImage) {
        // 429 = rate limited, mark as uncertain rather than broken
        if (imgResult.statusCode === 429) {
          result.stationImageError = 'Rate limited (429) — retry later';
        } else {
          result.imageOk = false;
          result.stationImageError = imgResult.recommendation || (imgResult.reachable ? 'Not an image' : 'Unreachable');
        }
      }
    }

    await new Promise(r => setTimeout(r, 300));

    // Check college image
    if (station.college_image) {
      const imgResult = await testImageUrl(station.college_image);
      result.collegeImageDetail = imgResult;
      if (!imgResult.reachable || !imgResult.isImage) {
        if (imgResult.statusCode === 429) {
          result.collegeImageError = 'Rate limited (429) — retry later';
        } else {
          result.imageOk = false;
          result.collegeImageError = imgResult.recommendation || (imgResult.reachable ? 'Not an image' : 'Unreachable');
        }
      }
    }

    results.push(result);

    if (!quietMode) {
      console.log(result.imageOk ? '✅' : '❌');
    }
  }

  // Filter if broken-only
  let outputResults = results;
  if (brokenOnly) {
    outputResults = results.filter(r => !r.imageOk);
  }

  // Output
  if (outputJson) {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      totalChecked: results.length,
      summary: {
        allGood: results.filter(r => r.imageOk).length,
        issues: results.filter(r => !r.imageOk).length,
      },
      results: outputResults,
    }, null, 2));
  } else {
    console.log('\n' + formatHumanReadable(outputResults));
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});