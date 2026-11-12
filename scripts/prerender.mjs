// Renders the page to static HTML after the client build, so crawlers and link previews see the content.
import { readFileSync, writeFileSync, rmSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const { render } = await import(pathToFileURL(resolve('dist-ssr/entry-server.js')).href);
const file = resolve('dist/index.html');
const html = readFileSync(file, 'utf8');
if (!html.includes('<div id="app"></div>')) throw new Error('prerender: #app placeholder not found');
writeFileSync(file, html.replace('<div id="app"></div>', `<div id="app">${render()}</div>`));
rmSync('dist-ssr', { recursive: true, force: true });
console.log('prerendered dist/index.html');
