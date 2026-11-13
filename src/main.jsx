import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
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
if (root.hasChildNodes()) hydrateRoot(root, <App />);
else createRoot(root).render(<App />);
