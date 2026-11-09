import React, { useMemo, useState } from 'react';
import { geoNaturalEarth1, geoPath, geoContains } from 'd3-geo';
import { feature } from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import usAtlas from 'us-atlas/states-10m.json';
import { places, kinds, views } from '../data/places.js';

const W = 960, H = 500;
const USA = 'United States of America';

const countries = feature(world, world.objects.countries).features
  .filter(f => f.properties.name !== 'Antarctica');
const states = feature(usAtlas, usAtlas.objects.states).features;

const inBounds = (view, [lon, lat]) => {
  if (!view.bounds) return true;
  const [[w, s], [e, n]] = view.bounds;
  return lon >= w && lon <= e && lat >= s && lat <= n;
};

// Pre-compute which US state each US place sits in
const stateOf = {};
for (const p of places) {
  if (p.country !== USA) continue;
  const st = states.find(s => geoContains(s, p.coords));
  if (st) stateOf[p.id] = st.properties.name;
}

export default function TravelMap() {
  const [selected, setSelected] = useState('gothenburg');
  const [viewId, setViewId] = useState('world');
  const [show, setShow] = useState({ life: true, visited: true });

  const view = views.find(v => v.id === viewId);
  const visible = places.filter(p => show[p.kind]);

  const { path, projection } = useMemo(() => {
    const projection = geoNaturalEarth1();
    if (view.bounds) {
      const [[w, s], [e, n]] = view.bounds;
      const pts = [];
      for (let i = 0; i <= 10; i++) {
        const lon = w + ((e - w) * i) / 10;
        pts.push([lon, s], [lon, n]);
      }
      projection.fitExtent([[20, 20], [W - 20, H - 20]], { type: 'MultiPoint', coordinates: pts });
    } else {
      projection.fitSize([W, H], { type: 'FeatureCollection', features: countries });
    }
    return { path: geoPath(projection), projection };
  }, [viewId]);

  // Colour countries (and US states) by the strongest kind of place in them
  const fill = useMemo(() => {
    const byCountry = {}, byState = {};
    for (const p of visible) {
      const set = (obj, key) => { if (obj[key] !== 'life') obj[key] = p.kind; };
      set(byCountry, p.country);
      if (stateOf[p.id]) set(byState, stateOf[p.id]);
    }
    return { byCountry, byState };
  }, [show]);

  const select = id => {
    const p = places.find(x => x.id === id);
    setSelected(id);
    // Move the camera if the place is outside the current view
    if (!inBounds(view, p.coords)) {
      const next = views.find(v => v.bounds && inBounds(v, p.coords)) || views[0];
      setViewId(next.id);
    }
  };

  const toggle = kind => {
    const next = { ...show, [kind]: !show[kind] };
    if (!next.life && !next.visited) return; // keep at least one on
    setShow(next);
    const cur = places.find(p => p.id === selected);
    if (cur && !next[cur.kind]) setSelected(places.find(p => next[p.kind]).id);
  };

  const current = places.find(p => p.id === selected);
  const regional = Boolean(view.bounds);

  return (
    <section id="map" className="page map-page">
      <h2 className="page-header">Map</h2>
      <p className="text-block center">Where I've lived, studied, worked and travelled. Click a dot.</p>

      <div className="map-controls" role="group" aria-label="Map view">
        {views.map(v => (
          <button key={v.id} className={v.id === viewId ? 'active' : ''} onClick={() => setViewId(v.id)}>{v.label}</button>
        ))}
      </div>
      <div className="map-controls filters" role="group" aria-label="Show on map">
        {Object.entries(kinds).map(([k, label]) => (
          <button key={k} className={`filter ${k}${show[k] ? ' on' : ''}`} aria-pressed={show[k]} onClick={() => toggle(k)}>
            <span className={`swatch ${k}`} />{label}
          </button>
        ))}
      </div>

      <div className="map-layout">
        <div className="map-frame">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="World map with the places Adam has lived, worked and visited">
            <rect width={W} height={H} className="ocean" />
            <g>
              {countries.filter(c => c.properties.name !== USA).map(c => (
                <path key={c.id ?? c.properties.name} d={path(c)} className={`country ${fill.byCountry[c.properties.name] || ''}`}>
                  <title>{c.properties.name}</title>
                </path>
              ))}
              {states.map(s => (
                <path key={s.id} d={path(s)} className={`country state ${fill.byState[s.properties.name] || ''}`}>
                  <title>{s.properties.name}</title>
                </path>
              ))}
            </g>
            <g>
              {visible.map(p => {
                const [x, y] = projection(p.coords);
                if (x < 0 || x > W || y < 0 || y > H) return null;
                const isSel = p.id === selected;
                const label = isSel || (regional && p.kind === 'life');
                return (
                  <g
                    key={p.id}
                    className={`marker ${p.kind}${isSel ? ' selected' : ''}`}
                    transform={`translate(${x},${y})`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${p.city}, ${p.country}`}
                    aria-pressed={isSel}
                    onClick={() => select(p.id)}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), select(p.id))}
                  >
                    <title>{p.city}</title>
                    <circle r={isSel ? 9 : p.kind === 'visited' ? 4.5 : 6} />
                    {label && <text x="11" y="4">{p.city}</text>}
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
              <p className="map-meta">
                {stateOf[current.id] ? `${stateOf[current.id]}, USA` : current.country}
                {current.when ? ` · ${current.when}` : ''}
              </p>
              {current.text && <p>{current.text}</p>}
            </>
          )}
          {Object.entries(kinds).filter(([k]) => show[k]).map(([k, label]) => (
            <div key={k} className="place-group">
              <h4><span className={`swatch ${k}`} />{label}</h4>
              <ul className={`place-list ${k}`}>
                {places.filter(p => p.kind === k).map(p => (
                  <li key={p.id}>
                    <button className={p.id === selected ? 'active' : ''} onClick={() => select(p.id)}>{p.city}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
