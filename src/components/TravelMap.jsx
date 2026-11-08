import React, { useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import { places, kinds } from '../data/places.js';

const W = 960, H = 500;

// Countries to colour, derived from the places list
const livedCountries = new Set(places.filter(p => p.kind === 'lived').map(p => p.country));
const workCountries = new Set(places.filter(p => p.kind === 'work').map(p => p.country));

export default function TravelMap() {
  const [selected, setSelected] = useState('gothenburg');
  const [zoomEurope, setZoomEurope] = useState(false);

  const { countries, path, projection } = useMemo(() => {
    const countries = feature(world, world.objects.countries).features
      .filter(f => f.properties.name !== 'Antarctica');
    const projection = geoNaturalEarth1();
    if (zoomEurope) {
      projection.center([8, 50]).scale(1100).translate([W / 2, H / 2]);
    } else {
      projection.fitSize([W, H], { type: 'FeatureCollection', features: countries });
    }
    return { countries, path: geoPath(projection), projection };
  }, [zoomEurope]);

  const current = places.find(p => p.id === selected);

  const countryClass = name =>
    livedCountries.has(name) ? 'country lived' : workCountries.has(name) ? 'country work' : 'country';

  return (
    <section id="map" className="page map-page">
      <h2 className="page-header">Map</h2>
      <p className="text-block center">Everywhere I've lived, studied and worked. Click a dot.</p>

      <div className="map-controls" role="group" aria-label="Map view">
        <button className={!zoomEurope ? 'active' : ''} onClick={() => setZoomEurope(false)}>World</button>
        <button className={zoomEurope ? 'active' : ''} onClick={() => setZoomEurope(true)}>Europe</button>
      </div>

      <div className="map-layout">
        <div className="map-frame">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="World map with the places Adam has lived and worked">
            <rect width={W} height={H} className="ocean" />
            <g>
              {countries.map(c => (
                <path key={c.id ?? c.properties.name} d={path(c)} className={countryClass(c.properties.name)}>
                  <title>{c.properties.name}</title>
                </path>
              ))}
            </g>
            <g>
              {places.map(p => {
                const [x, y] = projection(p.coords);
                if (x < 0 || x > W || y < 0 || y > H) return null;
                const isSel = p.id === selected;
                return (
                  <g
                    key={p.id}
                    className={`marker ${p.kind}${isSel ? ' selected' : ''}`}
                    transform={`translate(${x},${y})`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${p.city}, ${p.country}`}
                    aria-pressed={isSel}
                    onClick={() => setSelected(p.id)}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), setSelected(p.id))}
                  >
                    <circle r={isSel ? 9 : 6} />
                    {(isSel || zoomEurope) && <text x="11" y="4">{p.city}</text>}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <aside className="map-info" aria-live="polite">
          {current && (
            <>
              <h3>{current.city}</h3>
              <p className="map-meta">{current.country}{current.when ? ` · ${current.when}` : ''}</p>
              <p>{current.text}</p>
            </>
          )}
          <ul className="legend">
            <li><span className="swatch lived" />{kinds.lived}</li>
            <li><span className="swatch work" />{kinds.work}</li>
          </ul>
          <ul className="place-list">
            {places.map(p => (
              <li key={p.id}>
                <button className={p.id === selected ? 'active' : ''} onClick={() => setSelected(p.id)}>
                  {p.city}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
