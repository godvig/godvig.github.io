import React from 'react';

// app:  link to the running app (opens it for the visitor)
// code: link to the source on GitHub
const projects = [
  {
    name: 'Släktarkivet',
    app: 'https://godvig.github.io/slaktarkivet/',
    code: 'https://github.com/godvig/slaktarkivet',
    text: 'A genealogy tool: family tree, sources, timeline, map, photos and Excel import. Runs in the browser and saves to your own device, so try it with your own family.',
    status: 'Live',
  },
  {
    name: 'Stock screener',
    code: 'https://github.com/godvig/market-dashboard',
    text: 'Watchlists with scorecards, traffic lights and candlestick charts, pulling data from free market-data APIs. Needs a small server for the data, so it runs locally for now.',
    status: 'In progress',
  },
  {
    name: 'Size on disk for SteamOS',
    text: 'A Decky Loader plugin that shows how much space each game takes, mods included, right on the game page in Gaming Mode.',
    status: 'In progress',
  },
  {
    name: 'Meteora',
    text: 'A Greek-themed town for Heroes of Might and Magic III: Horn of the Abyss, built with a friend to replace the Conflux.',
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
