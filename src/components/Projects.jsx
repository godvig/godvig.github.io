import React from 'react';

const projects = [
  {
    name: 'Market dashboard',
    href: 'https://github.com/godvig/market-dashboard',
    text: 'Pulls market and stock data from free finance APIs into a tracker I can sort and analyse.',
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
    href: 'https://github.com/godvig/godvig.github.io',
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
            <h3>{p.href ? <a href={p.href}>{p.name}</a> : p.name}</h3>
            <p>{p.text}</p>
            <span className="status">{p.status}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
