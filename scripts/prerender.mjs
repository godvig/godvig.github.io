// Renders the page to static HTML after the client build, so crawlers and link previews see the content.
// English goes to dist/index.html, Swedish to dist/sv/index.html (served at /sv/).
import { readFileSync, writeFileSync, rmSync, mkdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const SITE = 'https://adamenglund.eu';
const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);
const file = resolve('dist/index.html');
const template = readFileSync(file, 'utf8');
if (!template.includes('<div id="app"></div>')) throw new Error('prerender: #app placeholder not found');

const alternates = [
  `<link rel="alternate" hreflang="en" href="${SITE}/">`,
  `<link rel="alternate" hreflang="sv" href="${SITE}/sv/">`,
  `<link rel="alternate" hreflang="x-default" href="${SITE}/">`,
].join('\n  ');

function replaceOnce(html, from, to) {
  if (!html.includes(from)) throw new Error(`prerender: "${from.slice(0, 60)}" not found in index.html`);
  return html.replace(from, to);
}

let en = template.replace('<link rel="canonical"', `${alternates}\n  <link rel="canonical"`);
en = en.replace('<div id="app"></div>', `<div id="app">${render('en')}</div>`);
writeFileSync(file, en);

const sv = [
  ['<html lang="en">', '<html lang="sv">'],
  [/<title>[^<]*<\/title>/, '<title>Adam Englund – civilingenjör, integrationer och egna projekt</title>'],
  [/<meta name="description" content="[^"]*">/, '<meta name="description" content="Adam Englund – applikationsspecialist på Centiro i Göteborg. Integrationer, logistikmjukvara, verktyg jag bygger på kvällarna och ett liv i sex länder.">'],
  [/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="Applikationsspecialist på Centiro i Göteborg. Integrationer, logistikmjukvara, verktyg jag bygger på kvällarna och ett liv i sex länder.">'],
  [`<link rel="canonical" href="${SITE}/">`, `<link rel="canonical" href="${SITE}/sv/">`],
  [`<meta property="og:url" content="${SITE}/">`, `<meta property="og:url" content="${SITE}/sv/">\n  <meta property="og:locale" content="sv_SE">`],
  ['<div id="app"></div>', `<div id="app">${render('sv')}</div>`],
].reduce((html, [a, b]) => (typeof a === 'string' ? replaceOnce(html, a, b) : html.replace(a, b)), template
  .replace('<link rel="canonical"', `${alternates}\n  <link rel="canonical"`));
mkdirSync(resolve('dist/sv'), { recursive: true });
writeFileSync(resolve('dist/sv/index.html'), sv);

rmSync('dist-ssr', { recursive: true, force: true });
console.log('prerendered dist/index.html and dist/sv/index.html');
