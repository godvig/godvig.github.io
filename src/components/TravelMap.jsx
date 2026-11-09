import React, { useEffect, useMemo, useRef, useState } from 'react';
import { geoNaturalEarth1, geoPath, geoContains, geoArea, geoBounds } from 'd3-geo';
import { feature } from 'topojson-client';
import { zoom as d3zoom, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';
import 'd3-transition';
import world from '../data/world.json';
import usAtlas from '../data/us-states.json';
import canadaAtlas from '../data/canada-provinces.json';
import { places, kinds, views, visitedCountries, visitedRegions } from '../data/places.js';
import { ranges } from '../data/ranges.js';

const W = 960, H = 500;
const USA = 'United States of America';
const CAN = 'Canada';
const MAX_ZOOM = 40;

// Kinds that colour a whole country, strongest first
const FILL_RANK = { lived: 3, work: 2, visited: 1 };

// ---------- Map data, prepared once ----------
// Simplified shapes can end up wound the wrong way and cover the whole globe; flip those polygons.
const fixPolygon = poly => {
  const area = geoArea({ type: 'Polygon', coordinates: poly });
  return area > 2 * Math.PI ? poly.map(ring => [...ring].reverse()) : poly;
};
const fixWinding = f => {
  const g = f.geometry;
  if (!g) return f;
  if (g.type === 'Polygon') return { ...f, geometry: { ...g, coordinates: fixPolygon(g.coordinates) } };
  if (g.type === 'MultiPolygon') return { ...f, geometry: { ...g, coordinates: g.coordinates.map(fixPolygon) } };
  return f;
};

const allCountries = feature(world, world.objects.countries).features
  .filter(f => f.properties.name !== 'Antarctica')
  .map(fixWinding)
  .map(f => {
    // Keep mainland France only (drop French Guiana and other overseas parts)
    if (f.properties.name !== 'France' || f.geometry.type !== 'MultiPolygon') return f;
    const coords = f.geometry.coordinates.filter(poly => poly[0][0][0] > -20 && poly[0][0][1] > 35);
    return { ...f, geometry: { type: 'MultiPolygon', coordinates: coords } };
  });
const countries = allCountries.filter(f => f.properties.name !== USA && f.properties.name !== CAN);
const regions = [
  ...feature(usAtlas, usAtlas.objects.states).features.map(f => ({ ...fixWinding(f), country: USA })),
  ...feature(canadaAtlas, canadaAtlas.objects.canada).features.map(f => ({ ...fixWinding(f), country: CAN })),
];

// d3 wants polygon rings clockwise; flip any that came out the other way
const rangeShapes = ranges.map(r => {
  let ring = [...r.points, r.points[0]];
  let shape = { type: 'Feature', properties: { name: r.name }, geometry: { type: 'Polygon', coordinates: [ring] } };
  if (geoArea(shape) > 2 * Math.PI) {
    ring = [...ring].reverse();
    shape = { ...shape, geometry: { type: 'Polygon', coordinates: [ring] } };
  }
  return shape;
});

// Which US state / Canadian province each place sits in
const regionOf = {};
for (const p of places) {
  if (p.country !== USA && p.country !== CAN) continue;
  if (p.region) { regionOf[p.id] = p.region; continue; }
  const r = regions.find(s => s.country === p.country && geoContains(s, p.coords));
  if (r) regionOf[p.id] = r.properties.name;
}

const projection = geoNaturalEarth1().fitSize([W, H], { type: 'FeatureCollection', features: allCountries });
const path = geoPath(projection);

// Zoom transform that fits a [[w, s], [e, n]] box into the map
function fitTransform([[w, s], [e, n]], maxK = MAX_ZOOM) {
  const pts = [];
  for (let i = 0; i <= 10; i++) {
    const lon = w + ((e - w) * i) / 10;
    pts.push(projection([lon, s]), projection([lon, n]));
  }
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const k = Math.min(maxK, 0.92 / Math.max((x1 - x0) / W, (y1 - y0) / H));
  return zoomIdentity.translate(W / 2 - (k * (x0 + x1)) / 2, H / 2 - (k * (y0 + y1)) / 2).scale(k);
}

// ---------- Symbols ----------
function Symbol({ kind, selected }) {
  const s = selected ? 1.5 : 1;
  if (kind === 'mountain') {
    return (
      <g transform={`scale(${s})`} className="sym-mountain">
        <path d="M-9,6 L0,-8 L9,6 Z" className="rock" />
        <path d="M-3.2,-3 L0,-8 L3.2,-3 L1.2,-4.2 L0,-2.8 L-1.4,-4.2 Z" className="snow" />
      </g>
    );
  }
  if (kind === 'football') {
    return (
      <g transform={`scale(${s})`} className="sym-football">
        <circle r="7" className="ball" />
        <path d="M0,-2.6 L2.5,-0.8 L1.55,2.1 L-1.55,2.1 L-2.5,-0.8 Z" className="patch" />
        <path d="M0,-2.6 L0,-7 M2.5,-0.8 L6.6,-2.1 M1.55,2.1 L4.1,5.6 M-1.55,2.1 L-4.1,5.6 M-2.5,-0.8 L-6.6,-2.1" className="seam" />
      </g>
    );
  }
  return <circle r={selected ? 9 : kind === 'visited' ? 4.5 : 6} />;
}

function Legend({ kind }) {
  if (kind === 'mountain' || kind === 'football') {
    return <svg className="legend-icon" viewBox="-10 -10 20 20" aria-hidden="true"><Symbol kind={kind} /></svg>;
  }
  return <span className={`swatch ${kind}`} />;
}

// ---------- Component ----------
export default function TravelMap() {
  const svgRef = useRef(null);
  const zoomRef = useRef(null);
  const [t, setT] = useState(zoomIdentity);
  const [selected, setSelected] = useState('gothenburg');
  const [viewId, setViewId] = useState('world');
  const [show, setShow] = useState({ lived: true, work: true, visited: true, mountain: true, football: true });

  // Set up zoom: scroll wheel, pinch, double-click and dragging with the hand cursor
  useEffect(() => {
    const z = d3zoom()
      .scaleExtent([1, MAX_ZOOM])
      .translateExtent([[0, 0], [W, H]])
      .clickDistance(4)
      .on('zoom', e => {
        setT(e.transform);
        if (e.sourceEvent) setViewId(null);
      });
    zoomRef.current = z;
    select(svgRef.current).call(z);
    return () => select(svgRef.current).on('.zoom', null);
  }, []);

  const animateTo = (transform, ms = 750) =>
    select(svgRef.current).transition().duration(ms).call(zoomRef.current.transform, transform);

  const zoomBy = factor =>
    select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, factor);

  const goToView = v => {
    setViewId(v.id);
    animateTo(v.bounds ? fitTransform(v.bounds) : zoomIdentity);
  };

  // Pan (and zoom in a bit if needed) so the place ends up in the middle
  const select_ = id => {
    const p = places.find(x => x.id === id);
    setSelected(id);
    setViewId(null);
    const [x, y] = projection(p.coords);
    const k = Math.max(t.k, 3);
    animateTo(zoomIdentity.translate(W / 2 - k * x, H / 2 - k * y).scale(k));
  };

  // Clicking a country zooms to it
  const zoomToFeature = f => {
    const [[w, s], [e, n]] = geoBounds(f);
    if (e < w) return; // crosses the date line (e.g. Russia, Fiji): skip
    setViewId(null);
    animateTo(fitTransform([[w, s], [e, n]], 12));
  };

  const visible = places.filter(p => show[p.kind]);

  // Colour countries, states and provinces: lived (purple) > work (yellow) > visited (green).
  // Mountains and football only show their symbol.
  const fill = useMemo(() => {
    const byCountry = {}, byRegion = {};
    const mark = (obj, key, kind) => {
      if (!FILL_RANK[kind]) return;
      if (!obj[key] || FILL_RANK[kind] > FILL_RANK[obj[key]]) obj[key] = kind;
    };
    if (show.visited) {
      visitedCountries.forEach(c => mark(byCountry, c, 'visited'));
      visitedRegions.forEach(r => mark(byRegion, r, 'visited'));
    }
    for (const p of visible) {
      mark(byCountry, p.country, p.kind);
      if (regionOf[p.id]) mark(byRegion, regionOf[p.id], p.kind);
    }
    return { byCountry, byRegion };
  }, [show]);

  const toggle = kind => {
    const next = { ...show, [kind]: !show[kind] };
    if (!Object.values(next).some(Boolean)) return; // keep at least one on
    setShow(next);
    const cur = places.find(p => p.id === selected);
    if (cur && !next[cur.kind]) setSelected(places.find(p => next[p.kind]).id);
  };

  const current = places.find(p => p.id === selected);
  const showLabels = t.k >= 3;
  const ordered = [...visible.filter(p => p.id !== selected), ...visible.filter(p => p.id === selected)];
  const hatch = 6 / t.k;

  return (
    <section id="map" className="page map-page">
      <h2 className="page-header">Map</h2>
      <p className="text-block center">Where I've lived, worked and travelled. Drag to move, scroll or pinch to zoom, click a symbol.</p>

      <div className="map-controls" role="group" aria-label="Map view">
        {views.map(v => (
          <button key={v.id} className={v.id === viewId ? 'active' : ''} onClick={() => goToView(v)}>{v.label}</button>
        ))}
      </div>
      <div className="map-controls filters" role="group" aria-label="Show on map">
        {Object.entries(kinds).map(([k, label]) => (
          <button key={k} className={`filter ${k}${show[k] ? ' on' : ''}`} aria-pressed={show[k]} onClick={() => toggle(k)}>
            <Legend kind={k} />{label}
          </button>
        ))}
      </div>

      <div className="map-layout">
        <div className="map-frame">
          <div className="zoom-buttons">
            <button onClick={() => zoomBy(1.6)} aria-label="Zoom in">+</button>
            <button onClick={() => zoomBy(1 / 1.6)} aria-label="Zoom out">−</button>
          </div>
          <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="World map with the places Adam has lived, worked and visited">
            <defs>
              <pattern id="range-hatch" patternUnits="userSpaceOnUse" width={hatch} height={hatch} patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2={hatch} className="hatch-line" strokeWidth={1.6 / t.k} />
              </pattern>
            </defs>
            <rect width={W} height={H} className="ocean" />
            <g transform={t.toString()}>
              {countries.map(c => (
                <path key={c.id ?? c.properties.name} d={path(c)} vectorEffect="non-scaling-stroke"
                  className={`country ${fill.byCountry[c.properties.name] || ''}`} onClick={() => zoomToFeature(c)}>
                  <title>{c.properties.name}</title>
                </path>
              ))}
              {regions.map(r => (
                <path key={r.country + r.properties.name} d={path(r)} vectorEffect="non-scaling-stroke"
                  className={`country region ${fill.byRegion[r.properties.name] || ''}`} onClick={() => zoomToFeature(r)}>
                  <title>{r.properties.name}</title>
                </path>
              ))}
              {show.mountain && rangeShapes.map(r => (
                <path key={r.properties.name} d={path(r)} className="range" fill="url(#range-hatch)" vectorEffect="non-scaling-stroke">
                  <title>{r.properties.name}</title>
                </path>
              ))}
            </g>
            <g>
              {ordered.map(p => {
                const [x, y] = t.apply(projection(p.coords));
                if (x < -20 || x > W + 20 || y < -20 || y > H + 20) return null;
                const isSel = p.id === selected;
                const label = isSel || (showLabels && (p.kind === 'lived' || p.kind === 'work'));
                return (
                  <g
                    key={p.id}
                    className={`marker ${p.kind}${isSel ? ' selected' : ''}`}
                    transform={`translate(${x},${y})`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${p.city}, ${p.country}`}
                    aria-pressed={isSel}
                    onClick={() => select_(p.id)}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), select_(p.id))}
                  >
                    <title>{p.city}</title>
                    <Symbol kind={p.kind} selected={isSel} />
                    {label && <text x={isSel ? 14 : 11} y="4">{p.city}</text>}
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
                {regionOf[current.id]
                  ? `${regionOf[current.id]}, ${current.country === USA ? 'USA' : 'Canada'}`
                  : current.country === current.city ? kinds[current.kind] : current.country}
                {current.when ? ` · ${current.when}` : ''}
              </p>
              {current.text && <p>{current.text}</p>}
            </>
          )}
          {Object.entries(kinds).filter(([k]) => show[k]).map(([k, label]) => (
            <div key={k} className="place-group">
              <h4><Legend kind={k} />{label}</h4>
              <ul className={`place-list ${k}`}>
                {places.filter(p => p.kind === k).map(p => (
                  <li key={p.id}>
                    <button className={p.id === selected ? 'active' : ''} onClick={() => select_(p.id)}>{p.city}</button>
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
