import React from 'react';
import { useT } from '../i18n.jsx';

const locations = [
  { id: 'Lund', name: 'Lund' },
  { id: 'Luxembourg', name: { en: 'Luxembourg', sv: 'Luxemburg' } },
  { id: 'London', name: 'London' },
  { id: 'Kingston', name: 'Kingston' },
  { id: 'Gothenburg', name: { en: 'Gothenburg', sv: 'Göteborg' } },
  { id: 'Milano', name: { en: 'Milan', sv: 'Milano' } },
  { id: 'Taipei', name: { en: 'Taipei', sv: 'Taipei' } },
];

export default function Header() {
  const t = useT();
  return (
    <header className="skyline">
      {locations.map(l => (
        <a key={l.id} className="location" href={`#map`} aria-label={`${t(l.name)} – ${t({ en: 'see the map', sv: 'se kartan' })}`}>
          <div className={`silhouette ${l.id}`} />
          <span className="location-name">{t(l.name)}</span>
        </a>
      ))}
    </header>
  );
}
