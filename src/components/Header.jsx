import React from 'react';
import { useT } from '../i18n.jsx';
import { focusPlace } from '../mapFocus.js';

const locations = [
  { id: 'Lund', place: 'lund', name: 'Lund' },
  { id: 'Luxembourg', place: 'luxembourg', name: { en: 'Luxembourg', sv: 'Luxemburg' } },
  { id: 'London', place: 'london', name: 'London' },
  { id: 'Kingston', place: 'kingston', name: 'Kingston' },
  { id: 'Gothenburg', place: 'gothenburg', name: { en: 'Gothenburg', sv: 'Göteborg' } },
  { id: 'Milano', place: 'milan', name: { en: 'Milan', sv: 'Milano' } },
  { id: 'Taipei', place: 'taipei', name: { en: 'Taipei', sv: 'Taipei' } },
];

export default function Header() {
  const t = useT();
  return (
    <header className="skyline">
      {locations.map(l => (
        <a key={l.id} className="location" href="#map" onClick={() => focusPlace(l.place)} aria-label={`${t(l.name)} – ${t({ en: 'see the map', sv: 'se kartan' })}`}>
          <div className={`silhouette ${l.id}`} />
          <span className="location-name">{t(l.name)}</span>
        </a>
      ))}
    </header>
  );
}
