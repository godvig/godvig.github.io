import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import { detectLang, pathLang, langPath } from './i18n.jsx';
import { countView } from './counter.js';
import './styles.css';

// In-page links scroll smoothly without adding #section to the address bar.
document.addEventListener('click', e => {
  const a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
  const target = document.getElementById(a.getAttribute('href').slice(1));
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: 'smooth' });
});

// Old links with a #section still work: scroll there, then tidy the address.
if (location.hash) {
  const id = location.hash.slice(1);
  history.replaceState(null, '', location.pathname + location.search);
  window.addEventListener('load', () => document.getElementById(id)?.scrollIntoView());
}

const root = document.getElementById('app');
// The build prerenders the page into #app (see scripts/prerender.mjs); in dev it is empty.
// / is prerendered in English and /sv/ in Swedish. If the visitor wants the other language,
// the address changes and the page is rendered fresh instead of hydrated.
const lang = detectLang();
const prerendered = pathLang();
if (lang !== prerendered) history.replaceState(null, '', langPath(lang) + location.search);
if (root.hasChildNodes() && lang === prerendered) hydrateRoot(root, <App lang={lang} />);
else createRoot(root).render(<App lang={lang} />);

// One anonymous count per page load, under the language the visitor ended up with (see counter.js).
countView(langPath(lang));
