#!/usr/bin/env node
/**
 * Campus FM Image Testing Suite
 *
 * Tests station_image and college_image URLs for all stations.
 *
 * Usage:
 *   node utils/test-images.js --all                    # Test all stations
 *   node utils/test-images.js --station KWVA           # Test single station
 *   node utils/test-images.js --stations KWVA,WXYC     # Test multiple stations
 *   node utils/test-images.js --url "https://..."      # Test a single image URL
 *   node utils/test-images.js --broken-only            # Only show broken images
 *   node utils/test-images.js --json                   # Output as JSON
 *   node utils/test-images.js --help                   # Show help
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ============================================================================
// Configuration
// ============================================================================

const TIMEOUT = 10000;
const MAX_CONCURRENT = 10;
const VALID_IMAGE_TYPES = [
  'image/jpeg', 'image/jpg', 'image/png', 'image/gif',
  'image/webp', 'image/svg+xml', 'image/x-icon', 'image/bmp',
  'image/avif', 'image/tiff',
];

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
// Image URL Testing
// ============================================================================

function testImageUrl(url, timeout = TIMEOUT) {
  return new Promise((resolve) => {
    if (!url) {
      resolve({ reachable: false, error: 'MISSING_URL', status: 'MISSING' });
      return;
    }

    const startTime = Date.now();
    try {
      const isHttps = url.startsWith('https://');
      const client = isHttps ? https : http;

      const req = client.get(url, {
        timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': 'image/*,*/*;q=0.8',
        }
      }, (res) => {
        const responseTime = Date.now() - startTime;

        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          res.destroy();
          const redirectUrl = res.headers.location.startsWith('http')
            ? res.headers.location
            : new URL(res.headers.location, url).href;
          testImageUrl(redirectUrl, timeout - responseTime).then((redirectResult) => {
            resolve({ ...redirectResult, redirectedFrom: url });
          });
          return;
        }

        if (res.statusCode >= 400) {
          res.destroy();
          resolve({
            reachable: false,
            statusCode: res.statusCode,
            responseTime,
            error: `HTTP ${res.statusCode}`,
            status: 'BROKEN',
          });
          return;
        }

        const contentType = res.headers['content-type']?.split(';')[0]?.trim()?.toLowerCase();
        const isImage = VALID_IMAGE_TYPES.some(t => contentType?.includes(t));
        let dataReceived = 0;

        res.on('data', (chunk) => {
          dataReceived += chunk.length;
          if (dataReceived > 512) {
            res.destroy();
          }
        });

        res.on('close', () => {
          resolve({
            reachable: true,
            statusCode: res.statusCode,
            contentType,
            isImage,
            responseTime,
            status: isImage ? 'OK' : 'NOT_IMAGE',
          });
        });

        res.on('error', () => {
          resolve({
            reachable: true,
            statusCode: res.statusCode,
            contentType,
            isImage,
            responseTime,
            status: isImage ? 'OK' : 'NOT_IMAGE',
          });
        });
      });

      req.on('error', (err) => {
        resolve({
          reachable: false,
          error: err.code || err.message,
          responseTime: Date.now() - startTime,
          status: 'BROKEN',
        });
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({
          reachable: false,
          error: 'TIMEOUT',
          responseTime: timeout,
          status: 'BROKEN',
        });
      });

    } catch (err) {
      resolve({
        reachable: false,
        error: err.message,
        status: 'BROKEN',
      });
    }
  });
}

// ============================================================================
// Concurrent runner
// ============================================================================

async function runConcurrent(tasks, concurrency) {
  const results = new Array(tasks.length);
  let idx = 0;

  async function worker() {
    while (idx < tasks.length) {
      const i = idx++;
      results[i] = await tasks[i]();
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, tasks.length) }, () => worker()));
  return results;
}

// ============================================================================
// Station Analysis
// ============================================================================

async function analyzeStation(station, { quiet, json } = {}) {
  const { call_sign, college_name, station_image, college_image } = station;

  const [stationResult, collegeResult] = await Promise.all([
    testImageUrl(station_image),
    testImageUrl(college_image),
  ]);

  return {
    call_sign,
    college_name,
    station_image: {
      url: station_image || null,
      ...stationResult,
    },
    college_image: {
      url: college_image || null,
      ...collegeResult,
    },
  };
}

// ============================================================================
// Output Formatting
// ============================================================================

function statusIcon(status) {
  return { OK: '✅', BROKEN: '❌', NOT_IMAGE: '⚠️', MISSING: '🚫' }[status] || '❓';
}

function formatHumanReadable(results, brokenOnly) {
  const lines = [];

  lines.push('═'.repeat(80));
  lines.push('CAMPUS FM IMAGE ANALYSIS REPORT');
  lines.push('═'.repeat(80));
  lines.push(`Tested: ${results.length} stations`);
  lines.push(`Time: ${new Date().toISOString()}`);
  lines.push('');

  let stationOk = 0, stationBroken = 0, stationNotImage = 0, stationMissing = 0;
  let collegeOk = 0, collegeBroken = 0, collegeNotImage = 0, collegeMissing = 0;

  for (const r of results) {
    if (r.station_image.status === 'OK') stationOk++;
    else if (r.station_image.status === 'BROKEN') stationBroken++;
    else if (r.station_image.status === 'NOT_IMAGE') stationNotImage++;
    else if (r.station_image.status === 'MISSING') stationMissing++;

    if (r.college_image.status === 'OK') collegeOk++;
    else if (r.college_image.status === 'BROKEN') collegeBroken++;
    else if (r.college_image.status === 'NOT_IMAGE') collegeNotImage++;
    else if (r.college_image.status === 'MISSING') collegeMissing++;
  }

  lines.push('SUMMARY — station_image:');
  lines.push(`  ✅ OK: ${stationOk}  ❌ Broken: ${stationBroken}  ⚠️ Not image: ${stationNotImage}  🚫 Missing: ${stationMissing}`);
  lines.push('');
  lines.push('SUMMARY — college_image:');
  lines.push(`  ✅ OK: ${collegeOk}  ❌ Broken: ${collegeBroken}  ⚠️ Not image: ${collegeNotImage}  🚫 Missing: ${collegeMissing}`);
  lines.push('');

  const problems = results.filter(r =>
    r.station_image.status !== 'OK' || r.college_image.status !== 'OK'
  );

  if (problems.length === 0 && !brokenOnly) {
    lines.push('All images are working! 🎉');
  }

  const display = brokenOnly ? problems : results;

  if (problems.length > 0) {
    lines.push('─'.repeat(80));
    lines.push(brokenOnly ? 'BROKEN / PROBLEMATIC IMAGES:' : 'DETAILED RESULTS:');
    lines.push('─'.repeat(80));

    for (const r of display) {
      const si = r.station_image;
      const ci = r.college_image;
      const hasProblem = si.status !== 'OK' || ci.status !== 'OK';

      if (brokenOnly && !hasProblem) continue;

      lines.push(`  ${r.call_sign} (${r.college_name})`);
      if (!brokenOnly || si.status !== 'OK') {
        lines.push(`    station_image: ${statusIcon(si.status)} ${si.status}${si.error ? ` (${si.error})` : ''}${si.contentType && si.status === 'NOT_IMAGE' ? ` [${si.contentType}]` : ''}`);
        if (si.status !== 'OK') lines.push(`      URL: ${si.url || '(none)'}`);
      }
      if (!brokenOnly || ci.status !== 'OK') {
        lines.push(`    college_image: ${statusIcon(ci.status)} ${ci.status}${ci.error ? ` (${ci.error})` : ''}${ci.contentType && ci.status === 'NOT_IMAGE' ? ` [${ci.contentType}]` : ''}`);
        if (ci.status !== 'OK') lines.push(`      URL: ${ci.url || '(none)'}`);
      }
      lines.push('');
    }
  }

  lines.push('═'.repeat(80));
  return lines.join('\n');
}

// ============================================================================
// CLI
// ============================================================================

function printHelp() {
  console.log(`
Campus FM Image Testing Suite

Usage:
  node utils/test-images.js [options]

Options:
  --all                 Test all stations in stations.js
  --station <CALL>      Test a single station by call sign
  --stations <LIST>     Test multiple stations (comma-separated)
  --url <URL>           Test a single image URL directly
  --broken-only         Only show broken/problematic images
  --json                Output results as JSON
  --quiet               Minimal output (just summary)
  --help                Show this help message

Examples:
  node utils/test-images.js --all
  node utils/test-images.js --station KWVA
  node utils/test-images.js --all --broken-only
  node utils/test-images.js --all --json
  node utils/test-images.js --url "https://example.com/logo.png"
`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.length === 0) {
    printHelp();
    process.exit(0);
  }

  const outputJson = args.includes('--json');
  const quietMode = args.includes('--quiet');
  const brokenOnly = args.includes('--broken-only');

  // Single URL test
  const urlIdx = args.indexOf('--url');
  if (urlIdx !== -1 && args[urlIdx + 1]) {
    const url = args[urlIdx + 1];
    const result = await testImageUrl(url);
    if (outputJson) {
      console.log(JSON.stringify({ url, ...result }, null, 2));
    } else {
      console.log(`URL: ${url}`);
      console.log(`Status: ${statusIcon(result.status)} ${result.status}`);
      if (result.contentType) console.log(`Content-Type: ${result.contentType}`);
      if (result.error) console.log(`Error: ${result.error}`);
      if (result.responseTime) console.log(`Response time: ${result.responseTime}ms`);
    }
    return;
  }

  let stations = loadStations();

  // Filter by station
  const stationIdx = args.indexOf('--station');
  if (stationIdx !== -1 && args[stationIdx + 1]) {
    const callSign = args[stationIdx + 1].toUpperCase();
    stations = stations.filter(s => s.call_sign.toUpperCase() === callSign);
    if (stations.length === 0) {
      console.error(`Station "${callSign}" not found`);
      process.exit(1);
    }
  }

  const stationsIdx = args.indexOf('--stations');
  if (stationsIdx !== -1 && args[stationsIdx + 1]) {
    const callSigns = args[stationsIdx + 1].toUpperCase().split(',').map(s => s.trim());
    stations = stations.filter(s => callSigns.includes(s.call_sign.toUpperCase()));
    if (stations.length === 0) {
      console.error(`No matching stations found for: ${callSigns.join(', ')}`);
      process.exit(1);
    }
  }

  if (!args.includes('--all') && stationIdx === -1 && stationsIdx === -1) {
    console.error('Please specify --all, --station, --stations, or --url');
    printHelp();
    process.exit(1);
  }

  if (!outputJson && !quietMode) {
    console.log(`Testing images for ${stations.length} station(s)...\n`);
  }

  let completed = 0;
  const tasks = stations.map((station) => async () => {
    const result = await analyzeStation(station);
    completed++;
    if (!outputJson && !quietMode) {
      const si = statusIcon(result.station_image.status);
      const ci = statusIcon(result.college_image.status);
      process.stdout.write(`\r[${completed}/${stations.length}] ${station.call_sign} — station: ${si}  college: ${ci}    `);
    }
    return result;
  });

  const results = await runConcurrent(tasks, MAX_CONCURRENT);

  if (!outputJson && !quietMode) {
    process.stdout.write('\r' + ' '.repeat(80) + '\r');
  }

  if (outputJson) {
    const summary = {
      station_image: {
        ok: results.filter(r => r.station_image.status === 'OK').length,
        broken: results.filter(r => r.station_image.status === 'BROKEN').length,
        not_image: results.filter(r => r.station_image.status === 'NOT_IMAGE').length,
        missing: results.filter(r => r.station_image.status === 'MISSING').length,
      },
      college_image: {
        ok: results.filter(r => r.college_image.status === 'OK').length,
        broken: results.filter(r => r.college_image.status === 'BROKEN').length,
        not_image: results.filter(r => r.college_image.status === 'NOT_IMAGE').length,
        missing: results.filter(r => r.college_image.status === 'MISSING').length,
      },
    };
    let outputResults = brokenOnly
      ? results.filter(r => r.station_image.status !== 'OK' || r.college_image.status !== 'OK')
      : results;
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      totalTested: results.length,
      summary,
      results: outputResults,
    }, null, 2));
  } else {
    console.log(formatHumanReadable(results, brokenOnly));
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
