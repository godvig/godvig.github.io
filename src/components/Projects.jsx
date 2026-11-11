import React from 'react';

// app:  link to the running app (opens it for the visitor)
// code: link to the source on GitHub
const projects = [
  {
    name: 'Kinsaga',
    app: 'https://godvig.github.io/kinsaga/',
    code: 'https://github.com/godvig/kinsaga',
    text: 'Build your family history together: family tree, fan chart, sources, timeline, map and auto-written life stories. Runs in the browser with no account, so try the House of Vasa example or your own family.',
    status: 'Live',
  },
  {
    name: 'Stock screener',
    app: 'https://godvig.github.io/market-dashboard/',
    code: 'https://github.com/godvig/market-dashboard',
    text: 'Watchlists with scorecards, traffic lights and candlestick charts, pulling data from free market-data APIs. The demo runs on made-up prices; the real version runs locally with live data.',
    status: 'Demo',
  },
  {
    name: 'Size on disk for SteamOS',
    text: 'A Decky Loader plugin that shows how much space each game takes, mods included, right on the game page in Gaming Mode.',
    status: 'In progress',
  },
  {
    name: 'This website',
    code: 'https://github.com/godvig/godvig.github.io',
    text: 'Built in 2019 to learn React, rebuilt in 2026 with Vite and an interactive map.',
    status: 'Live',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="page">
      <h2 className="page-header">Projects</h2>
      <div className="project-grid">
        {projects.map(p => (
          <article key={p.name} className="project">
            <h3>{p.app ? <a href={p.app}>{p.name}</a> : p.name}</h3>
            <p>{p.text}</p>
            {(p.app || p.code) && (
              <p className="project-links">
                {p.app && <a className="open-app" href={p.app} target="_blank" rel="noopener noreferrer">Open the app</a>}
                {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer">Code on GitHub</a>}
              </p>
            )}
            <span className="status">{p.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
