import React from 'react';
import { useT } from '../i18n.jsx';

// app:  link to the running app (opens it for the visitor)
// code: link to the source on GitHub
const projects = [
  {
    name: 'Market Screener',
    app: 'https://screener.godvig.com/',
    code: 'https://github.com/godvig/market-screener',
    img: 'screener',
    text: {
      en: 'Watchlists with scorecards, traffic lights and candlestick charts, pulling data from free market-data APIs. The online demo runs on made-up prices; the real version runs locally with live data.',
      sv: 'Bevakningslistor med poängkort, trafikljus och candlestick-grafer, med data från gratis börs-API:er. Demon på nätet går på påhittade kurser; den riktiga versionen körs lokalt med livedata.',
    },
    status: 'Demo',
  },
  {
    name: 'Shadowbook',
    app: 'https://shadowbook.godvig.com/',
    code: 'https://github.com/godvig/shadowbook',
    img: 'shadowbook',
    text: {
      en: 'Chess prep: spar against a bot that opens like any chess.com or Lichess player. The Library turns your openings, a Lichess study or your own games into decks you drill with spaced repetition. Free, in the browser, no account.',
      sv: 'Schackförberedelser: träna mot en bot som öppnar som valfri spelare på chess.com eller Lichess. Library gör dina öppningar, en Lichess-studie eller dina egna partier till kortlekar som du nöter in med spaced repetition. Gratis, i webbläsaren, utan konto.',
    },
    status: 'Live',
  },
  {
    name: 'Släktsagan',
    app: 'https://xn--slktsagan-w2a.se/', // släktsagan.se, written in the form every browser and crawler accepts
    code: 'https://github.com/godvig/family-saga',
    img: 'slaktsagan',
    text: {
      en: 'Build your family history together: family tree, fan chart, sources, timeline and map, made for sharing and working on with relatives. Runs in the browser with no account, so try the example or your own family.',
      sv: 'Bygg släktens historia tillsammans: släktträd, antavla, källor, tidslinje och karta, gjort för att delas och fyllas på med släktingar. Körs i webbläsaren utan konto, så testa exemplet eller din egen släkt.',
    },
    status: 'Live',
  },
  {
    name: { en: 'Hoard: size on disk for SteamOS', sv: 'Hoard: spelstorlek för SteamOS' },
    code: 'https://github.com/godvig/decky-hoard',
    img: 'hoard',
    text: {
      en: 'A Decky Loader plugin that shows how much space each game really takes, mods and non-Steam games included, right on the game page in Gaming Mode.',
      sv: 'Ett Decky Loader-plugin som visar hur mycket plats varje spel verkligen tar, moddar och spel utanför Steam inräknade, direkt på spelsidan i Gaming Mode.',
    },
    status: 'Beta',
  },
  {
    name: { en: 'This website', sv: 'Den här sidan' },
    code: 'https://github.com/godvig/godvig.github.io',
    img: 'website',
    text: {
      en: 'Built in 2019 to learn React, rebuilt in 2026 with Vite and an interactive map.',
      sv: 'Byggd 2019 för att lära mig React, ombyggd 2026 med Vite och en interaktiv karta.',
    },
    status: 'Live',
  },
];

export default function Projects() {
  const t = useT();
  return (
    <section id="projects" className="page alt">
      <h2 className="page-header">{t({ en: 'Projects', sv: 'Projekt' })}</h2>
      <div className="project-grid">
        {projects.map(p => (
          <article key={p.code || p.name.en} className="project">
            {p.img && (
              <a className="project-shot" href={p.app || p.code} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
                <img src={`/img/projects/${p.img}.webp`} alt="" width="800" height="500" loading="lazy" />
              </a>
            )}
            <h3>{p.app ? <a href={p.app}>{t(p.name)}</a> : t(p.name)}</h3>
            <p>{t(p.text)}</p>
            {(p.app || p.code) && (
              <p className="project-links">
                {p.app && <a className="open-app" href={p.app} target="_blank" rel="noopener noreferrer">{t({ en: 'Open the app', sv: 'Öppna appen' })}</a>}
                {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer">{t({ en: 'Code on GitHub', sv: 'Koden på GitHub' })}</a>}
              </p>
            )}
            <span className="status">{t(p.status)}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
