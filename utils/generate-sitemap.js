#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from station call signs in src/stations.js.
 * Run before deploy: npm run build (prebuild runs this) or node utils/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.campus-fm.com';
const stationsPath = path.join(__dirname, '../src/stations.js');
const outPath = path.join(__dirname, '../public/sitemap.xml');

const content = fs.readFileSync(stationsPath, 'utf8');
const callSigns = [...content.matchAll(/call_sign:\s*["']([A-Z0-9]+)["']/g)].map((m) => m[1]);

const today = new Date().toISOString().slice(0, 10);

const urls = [
  { loc: BASE_URL + '/', priority: '1.0', changefreq: 'weekly' },
  ...callSigns.map((c) => ({
    loc: `${BASE_URL}/${c}`,
    priority: '0.8',
    changefreq: 'weekly',
  })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${escapeXml(u.loc)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

fs.writeFileSync(outPath, xml, 'utf8');
console.log(`Wrote sitemap.xml with ${urls.length} URLs (1 homepage + ${callSigns.length} stations).`);
