import React, { createContext, useContext, useEffect, useState } from 'react';

// English lives at /, Swedish at /sv/ (both prerendered, so search engines see both).
// Visitors on / whose browser prefers Swedish are moved to /sv/; the flags in the menu switch and remember the choice.
export const LANGS = ['en', 'sv'];
const KEY = 'lang';

export const pathLang = () => (typeof location !== 'undefined' && /^\/sv(\/|$)/.test(location.pathname) ? 'sv' : 'en');
export const langPath = l => (l === 'sv' ? '/sv/' : '/');

// /sv/ is always Swedish. On / the visitor's saved choice or browser language decides.
export function detectLang() {
  if (pathLang() === 'sv') return 'sv';
  try {
    const saved = localStorage.getItem(KEY);
    if (LANGS.includes(saved)) return saved;
  } catch { /* storage can be blocked */ }
  // Only the first (system) language counts, not every language the visitor has listed.
  const primary = typeof navigator === 'undefined' ? '' : (navigator.languages && navigator.languages[0]) || navigator.language || '';
  return /^sv\b/i.test(primary) ? 'sv' : 'en';
}

const LangContext = createContext({ lang: 'en', setLang: () => {} });

export function LangProvider({ initial = 'en', children }) {
  const [lang, setLangState] = useState(initial);
  const setLang = l => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch { /* ignore */ }
    history.replaceState(null, '', langPath(l));
  };
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext).lang;
export const useSetLang = () => useContext(LangContext).setLang;

// Pick the right language from { en, sv } (or return a plain string as is).
export function pick(value, lang) {
  if (value == null || typeof value !== 'object' || Array.isArray(value)) return value;
  return value[lang] ?? value.en;
}
export const useT = () => {
  const lang = useLang();
  return v => pick(v, lang);
};
