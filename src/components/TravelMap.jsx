import React, { useEffect, useMemo, useRef, useState } from 'react';
import { geoNaturalEarth1, geoPath, geoContains, geoArea } from 'd3-geo';
import { feature } from 'topojson-client';
import { zoom as d3zoom, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';
import 'd3-transition';
import world from '../data/world.json';
import usAtlas from '../data/us-states.json';
import canadaAtlas from '../data/canada-provinces.json';
import { places, kinds, views, workCountries, workRegions, visitedCountries, visitedRegions, heritageTypes } from '../data/places.js';
import { ranges, parks } from '../data/ranges.js';

const W = 960, H = 500;
const USA = 'United States of America';
const CAN = 'Canada';
const MAX_ZOOM = 300;

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
const toShape = r => {
  let ring = [...r.points, r.points[0]];
  let shape = { type: 'Feature', properties: { name: r.name }, geometry: { type: 'Polygon', coordinates: [ring] } };
  if (geoArea(shape) > 2 * Math.PI) {
    ring = [...ring].reverse();
    shape = { ...shape, geometry: { type: 'Polygon', coordinates: [ring] } };
  }
  return shape;
};
const rangeShapes = ranges.map(toShape);
const parkShapes = parks.map(toShape);

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
function Symbol({ kind, heritage = 'mixed', selected }) {
  const s = selected ? 1.4 : 1;
  // Selected symbols get a red ring with a white outline behind them
  const halo = selected && kind !== 'lived' && kind !== 'work' && kind !== 'visited'
    ? <circle r="14" className="halo" /> : null;
  if (kind === 'unesco') {
    return (
      <g>
        {halo}
        <g transform={`scale(${s})`} className={`sym-unesco ${heritage}`}>
          <path d="M0,-8 L8,0 L0,8 L-8,0 Z" className="left" />
          <path d="M0,-8 L8,0 L0,8 Z" className="right" />
          <path d="M0,-8 L8,0 L0,8 L-8,0 Z" className="edge" />
          <circle r="2.4" className="dot" />
        </g>
      </g>
    );
  }
  if (kind === 'mountain') {
    return (
      <g>
        {halo}
        <g transform={`scale(${s})`} className="sym-mountain">
          <path d="M-9,6 L0,-8 L9,6 Z" className="rock" />
          <path d="M-3.2,-3 L0,-8 L3.2,-3 L1.2,-4.2 L0,-2.8 L-1.4,-4.2 Z" className="snow" />
        </g>
      </g>
    );
  }
  if (kind === 'football') {
    return (
      <g>
        {halo}
        <g transform={`scale(${s})`} className="sym-football">
          <circle r="7" className="ball" />
          <path d="M0,-2.6 L2.5,-0.8 L1.55,2.1 L-1.55,2.1 L-2.5,-0.8 Z" className="patch" />
          <path d="M0,-2.6 L0,-7 M2.5,-0.8 L6.6,-2.1 M1.55,2.1 L4.1,5.6 M-1.55,2.1 L-4.1,5.6 M-2.5,-0.8 L-6.6,-2.1" className="seam" />
        </g>
      </g>
    );
  }
  return <circle r={selected ? 9 : kind === 'visited' ? 4.5 : 6} />;
}

function Legend({ kind }) {
  if (kind === 'mountain' || kind === 'football' || kind === 'unesco') {
    return <svg className="legend-icon" viewBox="-10 -10 20 20" aria-hidden="true"><Symbol kind={kind} /></svg>;
  }
  return <span className={`swatch ${kind}`} />;
}

// ---------- Component ----------
export default function TravelMap() {
  const svgRef = useRef(null);
  const zoomRef = useRef(null);
  const [t, setT] = useState(zoomIdentity);
  // On small screens the whole map is shrunk; scale symbols back up so they stay easy to tap
  const [ms, setMs] = useState(1);
  const [selected, setSelected] = useState('gothenburg');
  const [viewId, setViewId] = useState('europe');
  // Layers: what is drawn, independent of which categories are picked below
  const [layers, setLayers] = useState({ countries: true, markers: true, ranges: true, parks: true });
  const [show, setShow] = useState({ lived: true, work: false, visited: false, mountain: false, football: false, unesco: false });

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
    // Start zoomed in on Europe
    const europe = views.find(v => v.id === 'europe');
    if (europe && europe.bounds) select(svgRef.current).call(z.transform, fitTransform(europe.bounds));
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w) setMs(Math.min(3, Math.max(1, W / w)));
    });
    ro.observe(svgRef.current);
    return () => { ro.disconnect(); select(svgRef.current).on('.zoom', null); };
  }, []);

  const animateTo = (transform, ms = 750) =>
    select(svgRef.current).transition().duration(ms).call(zoomRef.current.transform, transform);

  const zoomBy = factor =>
    select(svgRef.current).transition().duration(300).call(zoomRef.current.scaleBy, factor);

  const goToView = v => {
    setViewId(v.id);
    animateTo(v.bounds ? fitTransform(v.bounds) : zoomIdentity);
  };

  // Places in the middle half of the map are just selected.
  // Places towards the edges (or off screen) make the map pan and zoom to them.
  const select_ = id => {
    const p = places.find(x => x.id === id);
    setSelected(id);
    const [x, y] = projection(p.coords);
    const [sx, sy] = t.apply([x, y]);
    const central = sx > W * 0.25 && sx < W * 0.75 && sy > H * 0.25 && sy < H * 0.75;
    if (central) return;
    setViewId(null);
    const k = Math.max(t.k, 3);
    animateTo(zoomIdentity.translate(W / 2 - k * x, H / 2 - k * y).scale(k));
  };

  // Clicking anywhere on the map that isn't a symbol clears the selection
  // (a drag doesn't count as a click, so moving the map keeps it)
  const onMapClick = e => {
    if (!e.target.closest('.marker')) setSelected(null);
  };

  const visible = places.filter(p => show[p.kind]);
  const drawn = layers.markers ? visible : [];

  // Colour countries, states and provinces: lived (purple) > work (yellow) > visited (green).
  // Mountains and football only show their symbol.
  const fill = useMemo(() => {
    const byCountry = {}, byRegion = {};
    const mark = (obj, key, kind) => {
      if (!FILL_RANK[kind]) return;
      if (!obj[key] || FILL_RANK[kind] > FILL_RANK[obj[key]]) obj[key] = kind;
    };
    if (show.work) {
      workCountries.forEach(c => mark(byCountry, c, 'work'));
      workRegions.forEach(r => mark(byRegion, r, 'work'));
    }
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

  const toggleLayer = key => setLayers(l => ({ ...l, [key]: !l[key] }));

  const toggle = kind => {
    const next = { ...show, [kind]: !show[kind] };
    if (!Object.values(next).some(Boolean)) return; // keep at least one on
    setShow(next);
    const cur = places.find(p => p.id === selected);
    if (cur && !next[cur.kind]) setSelected(places.find(p => next[p.kind]).id);
  };

  const current = places.find(p => p.id === selected);
  const showLabels = t.k >= 3;
  const ordered = [...drawn.filter(p => p.id !== selected), ...drawn.filter(p => p.id === selected)];
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

      <div className="map-controls layers" role="group" aria-label="Map layers">
        <span className="layers-label">Layers</span>
        {[['countries', 'Country colours'], ['markers', 'Markers'], ['ranges', 'Mountain ranges'], ['parks', 'National parks']].map(([k, label]) => (
          <button key={k} className={`layer ${k}${layers[k] ? ' on' : ''}`} aria-pressed={layers[k]} onClick={() => toggleLayer(k)}>
            <span className="switch" aria-hidden="true" />{label}
          </button>
        ))}
      </div>

      <div className="map-layout">
        <div className="map-frame">
          <div className="zoom-buttons">
            <button onClick={() => zoomBy(1.6)} aria-label="Zoom in">+</button>
            <button onClick={() => zoomBy(1 / 1.6)} aria-label="Zoom out">−</button>
          </div>
          <svg ref={svgRef} onClick={onMapClick} viewBox={`0 0 ${W} ${H}`} role="img" aria-label="World map with the places Adam has lived, worked and visited">
            <defs>
              <pattern id="range-hatch" patternUnits="userSpaceOnUse" width={hatch} height={hatch} patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2={hatch} className="hatch-line" strokeWidth={1.6 / t.k} />
              </pattern>
              <pattern id="park-hatch" patternUnits="userSpaceOnUse" width={hatch} height={hatch} patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2={hatch} className="hatch-line park" strokeWidth={1.8 / t.k} />
              </pattern>
            </defs>
            <rect width={W} height={H} className="ocean" />
            <g transform={t.toString()}>
              {countries.map(c => (
                <path key={c.id ?? c.properties.name} d={path(c)} vectorEffect="non-scaling-stroke"
                  className={`country ${layers.countries ? fill.byCountry[c.properties.name] || '' : ''}`}>
                  <title>{c.properties.name}</title>
                </path>
              ))}
              {regions.map(r => (
                <path key={r.country + r.properties.name} d={path(r)} vectorEffect="non-scaling-stroke"
                  className={`country region ${layers.countries ? fill.byRegion[r.properties.name] || '' : ''}`}>
                  <title>{r.properties.name}</title>
                </path>
              ))}
              {layers.ranges && rangeShapes.map(r => (
                <path key={r.properties.name} d={path(r)} className="range" fill="url(#range-hatch)" vectorEffect="non-scaling-stroke">
                  <title>{r.properties.name}</title>
                </path>
              ))}
              {layers.parks && parkShapes.map(r => (
                <path key={r.properties.name} d={path(r)} className="range park" fill="url(#park-hatch)" vectorEffect="non-scaling-stroke">
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
                    transform={`translate(${x},${y}) scale(${ms})`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${p.city}, ${p.country}`}
                    aria-pressed={isSel}
                    onClick={() => select_(p.id)}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), select_(p.id))}
                  >
                    <title>{p.city}</title>
                    <circle r="13" className="hit" />
                    <Symbol kind={p.kind} heritage={p.heritage} selected={isSel} />
                    {label && <text x={isSel ? 17 : 11} y="4">{p.city}</text>}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <aside className="map-info" aria-live="polite">
          {!current && <p className="map-hint">Click a symbol on the map to read about the place.</p>}
          {current && (
            <>
              <h3>{current.name || current.city}</h3>
              <p className="map-meta">
                {regionOf[current.id]
                  ? `${regionOf[current.id]}, ${current.country === USA ? 'USA' : 'Canada'}`
                  : current.country === current.city ? kinds[current.kind] : current.country}
                {current.when ? ` · ${current.when}` : ''}
              </p>
              {current.kind === 'unesco' && (
                <p className="heritage">
                  <span className={`heritage-tag ${current.heritage}`}>{heritageTypes[current.heritage]}</span>
                  <a href={`https://whc.unesco.org/en/list/${current.unescoId}/`} target="_blank" rel="noopener noreferrer">
                    UNESCO World Heritage page
                  </a>
                </p>
              )}
              {current.text && <p>{current.text}</p>}
              {current.photo && (
                <img className="jump-photo" src={current.photo} alt={`Jump photo at ${current.name || current.city}`} loading="lazy" />
              )}
            </>
          )}
          {Object.entries(kinds).filter(([k]) => show[k]).map(([k, label]) => (
            <div key={k} className="place-group">
              <h4><Legend kind={k} />{label}</h4>
              <ul className={`place-list ${k}`}>
                {places.filter(p => p.kind === k)
                  .sort((a, b) => (k === 'unesco' ? a.city.localeCompare(b.city) : 0))
                  .map(p => (
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
