// Smoke test for the built site: both languages are prerendered with the right head tags and content.
// Run after `npm run build` (CI does this before every deploy).
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const read = p => readFileSync(new URL(`../dist/${p}`, import.meta.url), 'utf8');
const checks = {
  'index.html': ['<html lang="en">', 'hreflang="sv"', 'rel="canonical" href="https://adamenglund.eu/"', "I&#x27;m Adam Englund", 'Market Screener', 'Selected writing'],
  'sv/index.html': ['<html lang="sv">', 'hreflang="en"', 'rel="canonical" href="https://adamenglund.eu/sv/"', 'Jag heter Adam Englund', 'Civilingenjör', 'Rapporter och uppsatser'],
};
for (const [file, needles] of Object.entries(checks)) {
  const html = read(file);
  for (const n of needles) assert.ok(html.includes(n), `${file} is missing: ${n}`);
}
for (const f of ['CNAME', 'robots.txt', 'sitemap.xml', 'og-image.png']) read(f);
console.log('build check passed');
