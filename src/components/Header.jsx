import React from 'react';

const locations = [
  { id: 'Lund', name: 'Lund' },
  { id: 'Luxembourg', name: 'Luxembourg' },
  { id: 'London', name: 'London' },
  { id: 'Kingston', name: 'Kingston' },
  { id: 'Gothenburg', name: 'Gothenburg' },
  { id: 'Milano', name: 'Milan' },
  { id: 'Taipei', name: 'Taipei' },
];

export default function Header() {
  return (
    <header className="skyline">
      {locations.map(l => (
        <a key={l.id} className="location" href={`#map`} aria-label={`${l.name} – see the map`}>
          <div className={`silhouette ${l.id}`} />
          <span className="location-name">{l.name}</span>
        </a>
      ))}
    </header>
  );
}
