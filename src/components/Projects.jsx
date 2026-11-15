import React from 'react';
import { useT } from '../i18n.jsx';

// app:  link to the running app (opens it for the visitor)
// code: link to the source on GitHub
const projects = [
  {
    name: { en: 'Stock screener', sv: 'Aktiescreener' },
    app: 'https://screener.godvig.com/',
    code: 'https://github.com/godvig/market-dashboard',
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
    text: {
      en: 'Chess opponent prep: play the person, not the engine. Scout any chess.com or Lichess player and spar against a bot that opens like them and plays on at their rating, then see where your preparation ran out. Runs in the browser with no account, so try the built-in demo player.',
      sv: 'Schackförberedelser inför nästa motståndare: spela mot människan, inte motorn. Spana in valfri spelare på chess.com eller Lichess och träna mot en bot som öppnar som hen och spelar vidare på hens rating, och se var din förberedelse tog slut. Körs i webbläsaren utan konto, så testa den inbyggda demospelaren.',
    },
    status: 'Live',
  },
  {
    name: 'Släktsagan',
    app: 'https://klansagan.godvig.com/',
    code: 'https://github.com/godvig/slaktsagan',
    text: {
      en: 'Build your family history together: family tree, fan chart, sources, timeline and map, made for sharing and working on with relatives. Runs in the browser with no account, so try the example or your own family.',
      sv: 'Bygg släktens historia tillsammans: släktträd, antavla, källor, tidslinje och karta, gjort för att delas och fyllas på med släktingar. Körs i webbläsaren utan konto, så testa exemplet eller din egen släkt.',
    },
    status: 'Live',
  },
  {
    name: { en: 'Size on disk for SteamOS', sv: 'Spelstorlek för SteamOS' },
    text: {
      en: 'A Decky Loader plugin that shows how much space each game takes, mods included, right on the game page in Gaming Mode.',
      sv: 'Ett Decky Loader-plugin som visar hur mycket plats varje spel tar, moddar inräknade, direkt på spelsidan i Gaming Mode.',
    },
    status: 'Live',
  },
  {
    name: { en: 'This website', sv: 'Den här sidan' },
    code: 'https://github.com/godvig/godvig.github.io',
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
            <h3>{p.app ? <a href={p.app}>{t(p.name)}</a> : t(p.name)}</h3>
            <p>{t(p.text)}</p>
            {(p.app || p.code) && (
              <p className="project-links">
                {p.app && <a className="open-app" href={p.app} target="_blank" rel="noopener noreferrer">{t({ en: 'Open the app', sv: 'Öppna appen' })}</a>}
                {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer">{t({ en: 'Code on GitHub', sv: 'Koden på GitHub' })}</a>}
              </p>
            )}
            <span className="status">{p.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
