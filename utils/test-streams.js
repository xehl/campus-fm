#!/usr/bin/env node
/**
 * Campus FM Stream Testing Suite
 * 
 * A comprehensive tool for testing radio station stream URLs.
 * Designed for both human operators and AI agents.
 * 
 * Usage:
 *   node utils/test-streams.js --all                    # Test all stations
 *   node utils/test-streams.js --station KWVA           # Test single station
 *   node utils/test-streams.js --stations KWVA,WXYC     # Test multiple stations
 *   node utils/test-streams.js --url "https://..."      # Test a single URL directly
 *   node utils/test-streams.js --via-proxy              # Test all HTTP stations through the proxy
 *   node utils/test-streams.js --via-proxy --station WBER   # Test one station via proxy
 *   node utils/test-streams.js --via-proxy --url "http://..." # Test one URL via proxy
 *   node utils/test-streams.js --http-only              # Test only HTTP stations (proxy candidates)
 *   node utils/test-streams.js --json                   # Output as JSON
 *   node utils/test-streams.js --help                   # Show help
 * 
 * Output includes:
 *   - Reachability (does URL respond?)
 *   - Content-type verification (is it audio?)
 *   - Protocol analysis (HTTP vs HTTPS)
 *   - Proxy compatibility assessment
 *   - Actionable recommendations
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

// ============================================================================
// Configuration
// ============================================================================

const TIMEOUT = 8000; // 8 second timeout per request
const VALID_AUDIO_TYPES = ['audio/mpeg', 'audio/mp3', 'audio/aac', 'audio/aacp', 'audio/ogg', 'application/ogg', 'audio/x-mpegurl'];

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
// Stream Testing
// ============================================================================

/**
 * Test a single stream URL
 * Returns detailed results about reachability, content type, and recommendations
 */
function testStreamUrl(url, timeout = TIMEOUT) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    try {
      const isHttps = url.startsWith('https://');
      const client = isHttps ? https : http;
      
      const req = client.get(url, {
        timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': '*/*',
          'Range': 'bytes=0-1024'
        }
      }, (res) => {
        const responseTime = Date.now() - startTime;
        let dataReceived = 0;
        
        // Handle redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          resolve({
            reachable: true,
            statusCode: res.statusCode,
            redirect: res.headers.location,
            responseTime,
            contentType: null,
            isAudio: false,
            protocol: isHttps ? 'https' : 'http',
            recommendation: `Redirects to ${res.headers.location}`
          });
          res.destroy();
          return;
        }
        
        res.on('data', (chunk) => {
          dataReceived += chunk.length;
          if (dataReceived > 100) {
            const contentType = res.headers['content-type']?.split(';')[0]?.trim();
            const isAudio = VALID_AUDIO_TYPES.some(t => contentType?.includes(t));
            
            resolve({
              reachable: true,
              statusCode: res.statusCode,
              contentType,
              isAudio,
              bytesReceived: dataReceived,
              responseTime,
              protocol: isHttps ? 'https' : 'http',
              recommendation: isAudio ? null : `Content-Type "${contentType}" may not be audio`
            });
            res.destroy();
          }
        });
        
        res.on('end', () => {
          const contentType = res.headers['content-type']?.split(';')[0]?.trim();
          const isAudio = VALID_AUDIO_TYPES.some(t => contentType?.includes(t));
          
          resolve({
            reachable: res.statusCode >= 200 && res.statusCode < 400,
            statusCode: res.statusCode,
            contentType,
            isAudio,
            bytesReceived: dataReceived,
            responseTime,
            protocol: isHttps ? 'https' : 'http',
            recommendation: res.statusCode >= 400 ? `HTTP ${res.statusCode} error` : null
          });
        });
      });
      
      req.on('error', (err) => {
        resolve({
          reachable: false,
          error: err.code || err.message,
          responseTime: Date.now() - startTime,
          protocol: isHttps ? 'https' : 'http',
          recommendation: `Connection failed: ${err.code || err.message}`
        });
      });
      
      req.on('timeout', () => {
        req.destroy();
        resolve({
          reachable: false,
          error: 'TIMEOUT',
          responseTime: timeout,
          protocol: isHttps ? 'https' : 'http',
          recommendation: 'Request timed out - server may be down or slow'
        });
      });
      
    } catch (err) {
      resolve({
        reachable: false,
        error: err.message,
        protocol: url.startsWith('https://') ? 'https' : 'http',
        recommendation: `Invalid URL or request error: ${err.message}`
      });
    }
  });
}

/**
 * Test if an HTTP URL also works on HTTPS (for upgrade recommendations)
 */
async function testHttpsUpgrade(httpUrl) {
  if (!httpUrl.startsWith('http://')) return null;
  
  const httpsUrl = httpUrl.replace('http://', 'https://');
  const result = await testStreamUrl(httpsUrl, 5000);
  
  return {
    httpsUrl,
    works: result.reachable && result.isAudio !== false,
    result
  };
}

/** Default proxy base URL (must match proxyHelper.js and worker ALLOWED_ORIGINS) */
const DEFAULT_PROXY_BASE = 'https://proxy.campus-fm.com/';
const DEFAULT_ORIGIN = 'https://campus-fm.com';

/**
 * Test an HTTP stream URL through the Campus FM proxy (simulates browser request).
 * Use this to find proxied streams that are broken and hammer the worker.
 */
function testStreamViaProxy(proxyBaseUrl, origin, httpAudioUrl, timeout = TIMEOUT) {
  const proxyUrl = proxyBaseUrl.replace(/\/?$/, '') + '/?url=' + encodeURIComponent(httpAudioUrl);
  return new Promise((resolve) => {
    const startTime = Date.now();
    try {
      const req = https.get(proxyUrl, {
        timeout,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
          'Accept': '*/*',
          'Origin': origin,
          'Range': 'bytes=0-1024'
        }
      }, (res) => {
        const responseTime = Date.now() - startTime;
        let dataReceived = 0;
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          resolve({
            reachable: true,
            statusCode: res.statusCode,
            redirect: res.headers.location,
            responseTime,
            isAudio: false,
            error: res.statusCode === 502 ? `Upstream error: ${res.statusCode}` : null
          });
          res.destroy();
          return;
        }
        if (res.statusCode >= 400) {
          resolve({
            reachable: true,
            statusCode: res.statusCode,
            responseTime,
            isAudio: false,
            error: `Proxy/upstream returned ${res.statusCode}`
          });
          res.destroy();
          return;
        }
        res.on('data', (chunk) => {
          dataReceived += chunk.length;
          if (dataReceived > 100) {
            const contentType = res.headers['content-type']?.split(';')[0]?.trim();
            const isAudio = VALID_AUDIO_TYPES.some(t => contentType?.includes(t));
            resolve({
              reachable: true,
              statusCode: res.statusCode,
              contentType,
              isAudio,
              bytesReceived: dataReceived,
              responseTime
            });
            res.destroy();
          }
        });
        res.on('end', () => {
          const contentType = res.headers['content-type']?.split(';')[0]?.trim();
          const isAudio = VALID_AUDIO_TYPES.some(t => contentType?.includes(t));
          resolve({
            reachable: res.statusCode >= 200 && res.statusCode < 400,
            statusCode: res.statusCode,
            contentType,
            isAudio,
            responseTime
          });
        });
      });
      req.on('error', (err) => {
        resolve({
          reachable: false,
          error: err.code || err.message,
          responseTime: Date.now() - startTime
        });
      });
      req.on('timeout', () => {
        req.destroy();
        resolve({
          reachable: false,
          error: 'TIMEOUT',
          responseTime: timeout
        });
      });
    } catch (err) {
      resolve({
        reachable: false,
        error: err.message
      });
    }
  });
}

/**
 * Analyze a station and provide comprehensive results
 */
async function analyzeStation(station) {
  const { call_sign, audio_url, college_name } = station;
  const isHttps = audio_url.startsWith('https://');
  
  // Test the primary URL
  const primaryResult = await testStreamUrl(audio_url);
  
  // Build analysis
  const analysis = {
    call_sign,
    college_name,
    audio_url,
    protocol: isHttps ? 'https' : 'http',
    ...primaryResult,
    issues: [],
    recommendations: []
  };
  
  // Check for issues and build recommendations
  if (!primaryResult.reachable) {
    analysis.issues.push('UNREACHABLE');
    analysis.recommendations.push(`Stream URL is not reachable: ${primaryResult.error || primaryResult.statusCode}`);
  } else if (!primaryResult.isAudio && !primaryResult.redirect) {
    analysis.issues.push('NOT_AUDIO');
    analysis.recommendations.push(`Response is not audio (${primaryResult.contentType})`);
  }
  
  if (!isHttps) {
    analysis.issues.push('HTTP_ONLY');
    analysis.needsProxy = true;
    
    // Check if HTTPS upgrade is possible
    const upgradeTest = await testHttpsUpgrade(audio_url);
    if (upgradeTest?.works) {
      analysis.httpsAvailable = true;
      analysis.httpsUrl = upgradeTest.httpsUrl;
      analysis.recommendations.push(`HTTPS available! Update URL to: ${upgradeTest.httpsUrl}`);
    } else {
      analysis.httpsAvailable = false;
      analysis.recommendations.push('HTTP only - requires proxy for HTTPS sites');
    }
  }
  
  // Determine overall status
  if (!primaryResult.reachable) {
    analysis.status = 'BROKEN';
  } else if (!isHttps && !analysis.httpsAvailable) {
    analysis.status = 'NEEDS_PROXY';
  } else if (analysis.httpsAvailable) {
    analysis.status = 'UPGRADE_AVAILABLE';
  } else if (primaryResult.isAudio || primaryResult.redirect) {
    analysis.status = 'OK';
  } else {
    analysis.status = 'UNKNOWN';
  }
  
  return analysis;
}

// ============================================================================
// Output Formatting
// ============================================================================

function formatHumanReadable(results) {
  const lines = [];
  
  lines.push('═'.repeat(80));
  lines.push('CAMPUS FM STREAM ANALYSIS REPORT');
  lines.push('═'.repeat(80));
  lines.push(`Tested: ${results.length} stations`);
  lines.push(`Time: ${new Date().toISOString()}`);
  lines.push('');
  
  // Summary counts
  const counts = {
    OK: results.filter(r => r.status === 'OK').length,
    NEEDS_PROXY: results.filter(r => r.status === 'NEEDS_PROXY').length,
    UPGRADE_AVAILABLE: results.filter(r => r.status === 'UPGRADE_AVAILABLE').length,
    BROKEN: results.filter(r => r.status === 'BROKEN').length,
    UNKNOWN: results.filter(r => r.status === 'UNKNOWN').length,
  };
  
  lines.push('SUMMARY:');
  lines.push(`  ✅ OK: ${counts.OK}`);
  lines.push(`  🔄 Needs Proxy: ${counts.NEEDS_PROXY}`);
  lines.push(`  ⬆️  Upgrade Available: ${counts.UPGRADE_AVAILABLE}`);
  lines.push(`  ❌ Broken: ${counts.BROKEN}`);
  lines.push(`  ❓ Unknown: ${counts.UNKNOWN}`);
  lines.push('');
  
  // Detailed results by category
  if (counts.BROKEN > 0) {
    lines.push('─'.repeat(80));
    lines.push('❌ BROKEN STATIONS (need new URLs or removal):');
    lines.push('─'.repeat(80));
    results.filter(r => r.status === 'BROKEN').forEach(r => {
      lines.push(`  ${r.call_sign} (${r.college_name})`);
      lines.push(`    URL: ${r.audio_url}`);
      lines.push(`    Error: ${r.error || r.statusCode}`);
      lines.push('');
    });
  }
  
  if (counts.UPGRADE_AVAILABLE > 0) {
    lines.push('─'.repeat(80));
    lines.push('⬆️  UPGRADE AVAILABLE (can switch to HTTPS):');
    lines.push('─'.repeat(80));
    results.filter(r => r.status === 'UPGRADE_AVAILABLE').forEach(r => {
      lines.push(`  ${r.call_sign} (${r.college_name})`);
      lines.push(`    Current: ${r.audio_url}`);
      lines.push(`    Upgrade: ${r.httpsUrl}`);
      lines.push('');
    });
  }
  
  if (counts.NEEDS_PROXY > 0) {
    lines.push('─'.repeat(80));
    lines.push('🔄 NEEDS PROXY (HTTP only, no HTTPS available):');
    lines.push('─'.repeat(80));
    results.filter(r => r.status === 'NEEDS_PROXY').forEach(r => {
      lines.push(`  ${r.call_sign} (${r.college_name})`);
      lines.push(`    URL: ${r.audio_url}`);
      lines.push('');
    });
  }
  
  lines.push('═'.repeat(80));
  
  return lines.join('\n');
}

// ============================================================================
// CLI Interface
// ============================================================================

function printHelp() {
  console.log(`
Campus FM Stream Testing Suite

Usage:
  node utils/test-streams.js [options]

Options:
  --all                 Test all stations in stations.js
  --station <CALL>      Test a single station by call sign (e.g., KWVA)
  --stations <LIST>     Test multiple stations (comma-separated, e.g., KWVA,WXYC,KALX)
  --url <URL>           Test a single stream URL directly (e.g., https://example.com/stream.mp3)
  --via-proxy           Test HTTP stations through the proxy (use with --url or --station for one)
  --proxy-url <URL>     Proxy base URL for --via-proxy (default: https://proxy.campus-fm.com/)
  --origin <ORIGIN>     Origin header for --via-proxy (default: https://campus-fm.com)
  --http-only           Test only HTTP stations (proxy candidates)
  --https-only          Test only HTTPS stations
  --broken-only         Only show broken stations in output
  --json                Output results as JSON
  --quiet               Minimal output (just summary)
  --help                Show this help message

Examples:
  node utils/test-streams.js --all
  node utils/test-streams.js --station KWVA
  node utils/test-streams.js --via-proxy
  node utils/test-streams.js --via-proxy --station WBER
  node utils/test-streams.js --via-proxy --url "http://example.com/stream.mp3"
  node utils/test-streams.js --via-proxy --json
  node utils/test-streams.js --http-only --json
  node utils/test-streams.js --all --broken-only
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
  const urlIdx = args.indexOf('--url');
  const urlArg = urlIdx !== -1 && args[urlIdx + 1] ? args[urlIdx + 1] : null;

  // Via-proxy: test through the Campus FM proxy (single URL, single station, or all HTTP stations)
  if (args.includes('--via-proxy')) {
    const proxyIdx = args.indexOf('--proxy-url');
    const originIdx = args.indexOf('--origin');
    const proxyBase = (proxyIdx !== -1 && args[proxyIdx + 1]) ? args[proxyIdx + 1] : DEFAULT_PROXY_BASE;
    const origin = (originIdx !== -1 && args[originIdx + 1]) ? args[originIdx + 1] : DEFAULT_ORIGIN;

    // Single URL: --via-proxy --url "http://..."
    if (urlArg && urlArg.startsWith('http://')) {
      const result = await testStreamViaProxy(proxyBase, origin, urlArg);
      const ok = result.reachable && (result.isAudio || (result.statusCode >= 200 && result.statusCode < 300));
      const status = ok ? 'OK' : 'BROKEN';
      if (outputJson) {
        console.log(JSON.stringify({ url: urlArg, status, ...result }, null, 2));
      } else {
        console.log(`URL: ${urlArg}`);
        console.log(`Via proxy: ${ok ? '✅ OK' : '❌ BROKEN'}${result.error ? ` (${result.error})` : ''}`);
        if (result.responseTime) console.log(`Response time: ${result.responseTime}ms`);
      }
      return;
    }

    // Single station or all HTTP stations
    let stations = loadStations().filter(s => s.audio_url.startsWith('http://'));
    const stationIdx = args.indexOf('--station');
    if (stationIdx !== -1 && args[stationIdx + 1]) {
      const callSign = args[stationIdx + 1].toUpperCase();
      stations = stations.filter(s => s.call_sign.toUpperCase() === callSign);
      if (stations.length === 0) {
        console.error(`Station "${callSign}" not found or not HTTP (no proxy needed for HTTPS)`);
        process.exit(1);
      }
    }
    if (stations.length === 0) {
      console.log('No HTTP stations to test.');
      return;
    }
    if (!outputJson && !quietMode) {
      console.log(`Testing ${stations.length} HTTP station(s) via proxy (${proxyBase})...\n`);
    }
    const results = [];
    for (let i = 0; i < stations.length; i++) {
      const station = stations[i];
      if (!outputJson && !quietMode) {
        process.stdout.write(`[${i + 1}/${stations.length}] ${station.call_sign}... `);
      }
      const result = await testStreamViaProxy(proxyBase, origin, station.audio_url);
      const ok = result.reachable && (result.isAudio || (result.statusCode >= 200 && result.statusCode < 300));
      const status = ok ? 'OK' : 'BROKEN';
      const row = { call_sign: station.call_sign, college_name: station.college_name, audio_url: station.audio_url, status, ...result };
      results.push(row);
      if (!outputJson && !quietMode) {
        console.log(ok ? '✅ OK' : `❌ BROKEN (${result.error || result.statusCode})`);
      }
    }
    const broken = results.filter(r => r.status === 'BROKEN');
    if (outputJson) {
      console.log(JSON.stringify({ timestamp: new Date().toISOString(), totalTested: results.length, brokenCount: broken.length, results }, null, 2));
    } else {
      console.log('\n' + '═'.repeat(60));
      console.log(`Via proxy: ${results.length - broken.length}/${results.length} OK, ${broken.length} BROKEN`);
      if (broken.length > 0) {
        console.log('\nBroken proxied streams (consider fixing or commenting out in stations.js):');
        broken.forEach(r => console.log(`  ${r.call_sign} (${r.college_name}) – ${r.error || r.statusCode}`));
      }
      console.log('═'.repeat(60));
    }
    return;
  }

  // Test a single URL directly (no proxy)
  if (urlArg) {
    const testUrl = urlArg;
    const result = await testStreamUrl(testUrl);
    const isHttps = testUrl.startsWith('https://');
    let status = result.reachable && (result.isAudio || result.redirect) ? 'OK' : (result.reachable ? 'UNKNOWN' : 'BROKEN');
    if (!isHttps && result.reachable && result.isAudio) {
      const upgrade = await testHttpsUpgrade(testUrl);
      if (upgrade?.works) status = 'UPGRADE_AVAILABLE';
      else status = 'NEEDS_PROXY';
    }
    if (outputJson) {
      console.log(JSON.stringify({ url: testUrl, status, ...result }, null, 2));
    } else {
      const icon = { OK: '✅', NEEDS_PROXY: '🔄', UPGRADE_AVAILABLE: '⬆️', BROKEN: '❌', UNKNOWN: '❓' }[status] || '?';
      console.log(`URL: ${testUrl}`);
      console.log(`Status: ${icon} ${status}`);
      console.log(`Reachable: ${result.reachable} | Status: ${result.statusCode || result.error} | Audio: ${result.isAudio ?? 'n/a'}`);
      if (result.recommendation) console.log(`Note: ${result.recommendation}`);
    }
    return;
  }
  
  // Load stations
  let stations = loadStations();
  
  // Filter by options
  if (args.includes('--http-only')) {
    stations = stations.filter(s => s.audio_url.startsWith('http://'));
  } else if (args.includes('--https-only')) {
    stations = stations.filter(s => s.audio_url.startsWith('https://'));
  }
  
  // Filter by specific stations
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
  
  // Run tests
  if (!outputJson && !quietMode) {
    console.log(`Testing ${stations.length} station(s)...\n`);
  }
  
  const results = [];
  for (let i = 0; i < stations.length; i++) {
    const station = stations[i];
    if (!outputJson && !quietMode) {
      process.stdout.write(`[${i + 1}/${stations.length}] ${station.call_sign}... `);
    }
    
    const analysis = await analyzeStation(station);
    results.push(analysis);
    
    if (!outputJson && !quietMode) {
      const statusIcon = {
        'OK': '✅',
        'NEEDS_PROXY': '🔄',
        'UPGRADE_AVAILABLE': '⬆️',
        'BROKEN': '❌',
        'UNKNOWN': '❓'
      }[analysis.status] || '?';
      console.log(`${statusIcon} ${analysis.status}`);
    }
  }
  
  // Filter results if needed
  let outputResults = results;
  if (brokenOnly) {
    outputResults = results.filter(r => r.status === 'BROKEN');
  }
  
  // Output
  if (outputJson) {
    console.log(JSON.stringify({
      timestamp: new Date().toISOString(),
      totalTested: results.length,
      summary: {
        ok: results.filter(r => r.status === 'OK').length,
        needsProxy: results.filter(r => r.status === 'NEEDS_PROXY').length,
        upgradeAvailable: results.filter(r => r.status === 'UPGRADE_AVAILABLE').length,
        broken: results.filter(r => r.status === 'BROKEN').length,
        unknown: results.filter(r => r.status === 'UNKNOWN').length,
      },
      results: outputResults
    }, null, 2));
  } else {
    console.log('\n' + formatHumanReadable(outputResults));
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
