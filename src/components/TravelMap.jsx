import React, { useEffect, useMemo, useRef, useState } from 'react';
import { geoNaturalEarth1, geoPath, geoContains, geoArea } from 'd3-geo';
import { feature } from 'topojson-client';
import { zoom as d3zoom, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';
import 'd3-transition';
import world from '../data/world.json';
import usAtlas from '../data/us-states.json';
import canadaAtlas from '../data/canada-provinces.json';
import { useT } from '../i18n.jsx';
import { places, kinds, views, workCountries, workRegions, visitedCountries, visitedRegions, heritageTypes, svNames } from '../data/places.js';
import { ranges, parks } from '../data/ranges.js';
import { onFocusPlace, takePendingPlace } from '../mapFocus.js';

const W = 960, H = 500;
const USA = 'United States of America';
const CAN = 'Canada';
const MAX_ZOOM = 300;
// World Heritage symbols closer together than this on screen are drawn as one symbol with a count
const CLUSTER_PX = 26;
// How far in the map goes when a place is picked from the skyline at the top of the page
const FOCUS_ZOOM = 5;

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
const LIST_LIMIT = 12; // longer lists are collapsed behind a "Show all" button
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

const centredOn = (coords, k) => {
  const [x, y] = projection(coords);
  return zoomIdentity.translate(W / 2 - k * x, H / 2 - k * y).scale(k);
};

// Group points that sit within `radius` of each other on screen. Each group keeps the average position.
function cluster(items, radius) {
  const groups = [];
  for (const it of items) {
    const g = groups.find(c => Math.hypot(c.x - it.x, c.y - it.y) < radius);
    if (!g) { groups.push({ x: it.x, y: it.y, members: [it] }); continue; }
    g.members.push(it);
    g.x = g.members.reduce((sum, m) => sum + m.x, 0) / g.members.length;
    g.y = g.members.reduce((sum, m) => sum + m.y, 0) / g.members.length;
  }
  return groups;
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
  const tr = useT();
  const sv = tr({ en: false, sv: true });
  const nm = n => (sv && svNames[n]) || n;
  const svgRef = useRef(null);
  const zoomRef = useRef(null);
  const [t, setT] = useState(zoomIdentity);
  // On small screens the whole map is shrunk; scale symbols back up so they stay easy to tap
  const [ms, setMs] = useState(1);
  // A place picked from the skyline before the map had loaded wins over the default
  const [asked] = useState(takePendingPlace);
  const [selected, setSelected] = useState(asked || 'gothenburg');
  const [expanded, setExpanded] = useState({});
  const [viewId, setViewId] = useState('europe');
  // Per category: are its markers drawn, and is its area layer drawn (country colours / mountain ranges / national parks)?
  const [show, setShow] = useState(() => Object.fromEntries(Object.keys(kinds).map(k => [k, { markers: k === 'lived', area: k === 'lived' }])));

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
    const askedPlace = places.find(p => p.id === asked);
    if (askedPlace) {
      setViewId(null);
      select(svgRef.current).call(z.transform, centredOn(askedPlace.coords, FOCUS_ZOOM));
    } else if (europe && europe.bounds) select(svgRef.current).call(z.transform, fitTransform(europe.bounds));
    // Later picks from the skyline: select the place, make sure its marker is drawn and move there
    const stopListening = onFocusPlace(id => {
      takePendingPlace(); // the map is here to act on it, so nothing is left waiting
      const p = places.find(x => x.id === id);
      if (!p) return;
      setSelected(p.id);
      setViewId(null);
      setShow(prev => ({ ...prev, [p.kind]: { ...prev[p.kind], markers: true } }));
      select(svgRef.current).transition().duration(750).call(z.transform, centredOn(p.coords, FOCUS_ZOOM));
    });
    const ro = new ResizeObserver(([entry]) => {
      const w = entry.contentRect.width;
      if (w) setMs(Math.min(3, Math.max(1, W / w)));
    });
    ro.observe(svgRef.current);
    return () => { stopListening(); ro.disconnect(); select(svgRef.current).on('.zoom', null); };
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
    animateTo(centredOn(p.coords, Math.max(t.k, 3)));
  };

  // A numbered symbol zooms in until its places come apart
  const openCluster = members => {
    const lons = members.map(m => m.p.coords[0]), lats = members.map(m => m.p.coords[1]);
    const box = [[Math.min(...lons), Math.min(...lats)], [Math.max(...lons), Math.max(...lats)]];
    const k = Math.min(MAX_ZOOM, Math.max(fitTransform(box).k * 0.7, t.k * 1.6));
    setViewId(null);
    animateTo(centredOn([(box[0][0] + box[1][0]) / 2, (box[0][1] + box[1][1]) / 2], k));
  };

  // Clicking anywhere on the map that isn't a symbol clears the selection
  // (a drag doesn't count as a click, so moving the map keeps it)
  const onMapClick = e => {
    if (!e.target.closest('.marker')) setSelected(null);
  };

  const drawn = places.filter(p => show[p.kind].markers);
  const coloured = places.filter(p => show[p.kind].area);

  // Colour countries, states and provinces: lived (purple) > work (yellow) > visited (green).
  // Mountains and football only show their symbol.
  const fill = useMemo(() => {
    const byCountry = {}, byRegion = {};
    const mark = (obj, key, kind) => {
      if (!FILL_RANK[kind]) return;
      if (!obj[key] || FILL_RANK[kind] > FILL_RANK[obj[key]]) obj[key] = kind;
    };
    if (show.work.area) {
      workCountries.forEach(c => mark(byCountry, c, 'work'));
      workRegions.forEach(r => mark(byRegion, r, 'work'));
    }
    if (show.visited.area) {
      visitedCountries.forEach(c => mark(byCountry, c, 'visited'));
      visitedRegions.forEach(r => mark(byRegion, r, 'visited'));
    }
    for (const p of coloured) {
      mark(byCountry, p.country, p.kind);
      if (regionOf[p.id]) mark(byRegion, regionOf[p.id], p.kind);
    }
    return { byCountry, byRegion };
  }, [show]);

  const [layersOpen, setLayersOpen] = useState(false);
  // The top chips switch a category's main layer: colour for Lived/Worked/Visited, symbols for the rest.
  // Extra layers (markers for the three colour categories, ranges and parks) live under Layers.
  const mainPart = { lived: 'area', work: 'area', visited: 'area', mountain: 'markers', football: 'markers', unesco: 'markers' };
  const toggleKind = kind => toggle(kind, mainPart[kind]);
  const markerKinds = ['lived', 'work', 'visited', 'mountain', 'unesco', 'football'];
  // Mountains + ranges and World Heritage + parks sit together: the first tap turns on both halves,
  // after that each half toggles on its own.
  const pairs = [['mountain', { en: 'Mountain ranges', sv: 'Bergskedjor' }], ['unesco', { en: 'Parks', sv: 'Parker' }]];
  const togglePair = (kind, part) => setShow(prev => {
    const cur = prev[kind];
    const next = !cur.markers && !cur.area ? { markers: true, area: true } : { ...cur, [part]: !cur[part] };
    return { ...prev, [kind]: next };
  });
  const activeExtras = markerKinds.filter(k => show[k].markers).length + (show.mountain.area ? 1 : 0) + (show.unesco.area ? 1 : 0);
  const toggle = (kind, part) => setShow(prev => ({ ...prev, [kind]: { ...prev[kind], [part]: !prev[kind][part] } }));

  const current = places.find(p => p.id === selected);
  const showLabels = t.k >= 3;
  const ordered = [...drawn.filter(p => p.id !== selected), ...drawn.filter(p => p.id === selected)];
  const hatch = 6 / t.k;
  const whenText = w => (typeof w === 'string' ? (sv ? w.replace('now', 'idag') : w) : tr(w));

  // Where each marker lands on screen. World Heritage sites that would overlap become one numbered symbol,
  // which splits up as the visitor zooms in. The selected place always stands alone.
  const onScreen = ordered
    .map(p => { const [x, y] = t.apply(projection(p.coords)); return { p, x, y }; })
    .filter(m => m.x > -20 && m.x < W + 20 && m.y > -20 && m.y < H + 20);
  const loose = m => m.p.kind !== 'unesco' || m.p.id === selected;
  const groups = cluster(onScreen.filter(m => !loose(m)), CLUSTER_PX * ms);
  const clusters = groups.filter(g => g.members.length > 1);
  const single = new Set(groups.filter(g => g.members.length === 1).map(g => g.members[0].p.id));
  const markers = onScreen.filter(m => loose(m) || single.has(m.p.id));

  return (
    <section id="map" className="page map-page">
      <h2 className="page-header">{tr({ en: 'Map', sv: 'Karta' })}</h2>
      <p className="text-block center">{tr({ en: "Where I've lived, worked and travelled. Drag to move, scroll or pinch to zoom, click a symbol.", sv: 'Där jag har bott, jobbat och rest. Dra för att flytta, scrolla eller nyp för att zooma, klicka på en symbol.' })}</p>

      <div className="map-controls" role="group" aria-label={tr({ en: 'Map view', sv: 'Kartvy' })}>
        {views.map(v => (
          <button key={v.id} className={v.id === viewId ? 'active' : ''} onClick={() => goToView(v)}>{tr(v.label)}</button>
        ))}
      </div>
      <div className="map-controls filters" role="group" aria-label={tr({ en: 'Show on map', sv: 'Visa på kartan' })}>
        {['lived', 'work', 'visited'].map(k => {
          const on = show[k][mainPart[k]];
          return (
            <button key={k} className={`filter-chip ${k}${on ? ' on' : ''}`} aria-pressed={on} onClick={() => toggleKind(k)}>
              <Legend kind={k} />{tr(kinds[k])}
            </button>
          );
        })}
        <button className={`layers-btn${layersOpen ? ' active' : ''}`} aria-expanded={layersOpen} onClick={() => setLayersOpen(o => !o)}>
          {tr({ en: 'Layers', sv: 'Lager' })} <span className="count">{activeExtras}</span> <span aria-hidden="true">{layersOpen ? '▴' : '▾'}</span>
        </button>
      </div>
      {layersOpen && (
        <div className="map-controls layers-panel" role="group" aria-label={tr({ en: 'More layers', sv: 'Fler lager' })}>
          {['lived', 'work', 'visited', 'football'].map(k => (
            <button key={k} className={`filter-chip small ${k}${show[k].markers ? ' on' : ''}`} aria-pressed={show[k].markers} onClick={() => toggle(k, 'markers')}>
              <Legend kind={k} />{tr(kinds[k])}
            </button>
          ))}
          {pairs.map(([k, areaLabel]) => (
            <span key={k} className="chip-pair" role="group" aria-label={tr(kinds[k])}>
              <button className={`filter-chip small ${k}${show[k].markers ? ' on' : ''}`} aria-pressed={show[k].markers} onClick={() => togglePair(k, 'markers')}>
                <Legend kind={k} />{tr(kinds[k])}
              </button>
              <button className={`filter-chip small ${k}${show[k].area ? ' on' : ''}`} aria-pressed={show[k].area} onClick={() => togglePair(k, 'area')}>
                {tr(areaLabel)}
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="map-layout">
        <div className="map-frame">
          <div className="zoom-buttons">
            <button onClick={() => zoomBy(1.6)} aria-label={tr({ en: 'Zoom in', sv: 'Zooma in' })}>+</button>
            <button onClick={() => zoomBy(1 / 1.6)} aria-label={tr({ en: 'Zoom out', sv: 'Zooma ut' })}>−</button>
          </div>
          <svg ref={svgRef} onClick={onMapClick} viewBox={`0 0 ${W} ${H}`} role="img" aria-label={tr({ en: 'World map with the places Adam has lived, worked and visited', sv: 'Världskarta med platser där Adam har bott, jobbat och varit' })}>
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
                  className={`country ${fill.byCountry[c.properties.name] || ''}`}>
                  <title>{c.properties.name}</title>
                </path>
              ))}
              {regions.map(r => (
                <path key={r.country + r.properties.name} d={path(r)} vectorEffect="non-scaling-stroke"
                  className={`country region ${fill.byRegion[r.properties.name] || ''}`}>
                  <title>{r.properties.name}</title>
                </path>
              ))}
              {show.mountain.area && rangeShapes.map(r => (
                <path key={r.properties.name} d={path(r)} className="range" fill="url(#range-hatch)" vectorEffect="non-scaling-stroke">
                  <title>{r.properties.name}</title>
                </path>
              ))}
              {show.unesco.area && parkShapes.map(r => (
                <path key={r.properties.name} d={path(r)} className="range park" fill="url(#park-hatch)" vectorEffect="non-scaling-stroke">
                  <title>{r.properties.name}</title>
                </path>
              ))}
            </g>
            <g>
              {clusters.map(g => {
                const types = new Set(g.members.map(m => m.p.heritage));
                const names = g.members.map(m => nm(m.p.city)).sort().join(', ');
                return (
                  <g
                    key={g.members.map(m => m.p.id).join('+')}
                    className="marker unesco cluster"
                    transform={`translate(${g.x},${g.y}) scale(${ms})`}
                    tabIndex={0}
                    role="button"
                    aria-label={tr({ en: `${g.members.length} World Heritage sites, zoom in`, sv: `${g.members.length} världsarv, zooma in` })}
                    onClick={() => openCluster(g.members)}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), openCluster(g.members))}
                  >
                    <title>{names}</title>
                    <circle r="15" className="hit" />
                    <g transform="scale(1.45)" className={`sym-unesco ${types.size === 1 ? [...types][0] : 'mixed'}`}>
                      <path d="M0,-8 L8,0 L0,8 L-8,0 Z" className="left" />
                      <path d="M0,-8 L8,0 L0,8 Z" className="right" />
                      <path d="M0,-8 L8,0 L0,8 L-8,0 Z" className="edge" />
                    </g>
                    <text y="3.5">{g.members.length}</text>
                  </g>
                );
              })}
              {markers.map(({ p, x, y }) => {
                const isSel = p.id === selected;
                const label = isSel || (showLabels && (p.kind === 'lived' || p.kind === 'work'));
                return (
                  <g
                    key={p.id}
                    className={`marker ${p.kind}${isSel ? ' selected' : ''}`}
                    transform={`translate(${x},${y}) scale(${ms})`}
                    tabIndex={0}
                    role="button"
                    aria-label={`${nm(p.city)}, ${nm(p.country)}`}
                    aria-pressed={isSel}
                    onClick={() => select_(p.id)}
                    onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), select_(p.id))}
                  >
                    <title>{nm(p.city)}</title>
                    <circle r="13" className="hit" />
                    <Symbol kind={p.kind} heritage={p.heritage} selected={isSel} />
                    {label && <text x={isSel ? 17 : 11} y="4">{nm(p.city)}</text>}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        <aside className="map-info" aria-live="polite">
          {!current && <p className="map-hint">{tr({ en: 'Click a symbol on the map to read about the place.', sv: 'Klicka på en symbol på kartan för att läsa om platsen.' })}</p>}
          {current && (
            <>
              <h3>{current.name || nm(current.city)}</h3>
              <p className="map-meta">
                {regionOf[current.id]
                  ? `${regionOf[current.id]}, ${current.country === USA ? 'USA' : 'Canada'}`
                  : current.country === current.city ? tr(kinds[current.kind]) : nm(current.country)}
                {current.when ? ` · ${whenText(current.when)}` : ''}
              </p>
              {current.kind === 'unesco' && (
                <p className="heritage">
                  <span className={`heritage-tag ${current.heritage}`}>{tr(heritageTypes[current.heritage])}</span>
                  <a href={`https://whc.unesco.org/en/list/${current.unescoId}/`} target="_blank" rel="noopener noreferrer">
                    {tr({ en: 'UNESCO World Heritage page', sv: 'UNESCO:s världsarvssida' })}
                  </a>
                </p>
              )}
              {current.text && <p>{tr(current.text)}</p>}
              {current.photo && (
                <img className="jump-photo" src={current.photo} alt={`${tr({ en: "Jump photo at", sv: "Hoppbild vid" })} ${current.name || current.city}`} loading="lazy" />
              )}
            </>
          )}
          {Object.entries(kinds).filter(([k]) => show[k].markers).map(([k, label]) => {
            label = tr(label);
            const all = places.filter(p => p.kind === k)
              .sort((x, y) => (k === 'unesco' ? x.city.localeCompare(y.city) : 0));
            const open = expanded[k];
            let list = all;
            if (!open && all.length > LIST_LIMIT) {
              list = all.slice(0, LIST_LIMIT);
              const sel = all.find(p => p.id === selected);
              if (sel && !list.includes(sel)) list = [...list, sel]; // keep the selected place visible
            }
            return (
              <div key={k} className="place-group">
                <h4><Legend kind={k} />{label} <span className="count">{all.length}</span></h4>
                <ul className={`place-list ${k}`}>
                  {list.map(p => (
                    <li key={p.id}>
                      <button className={p.id === selected ? 'active' : ''} onClick={() => select_(p.id)}>{nm(p.city)}</button>
                    </li>
                  ))}
                  {all.length > LIST_LIMIT && (
                    <li>
                      <button className="more" onClick={() => setExpanded(e => ({ ...e, [k]: !e[k] }))}>
                        {open ? tr({ en: 'Show fewer', sv: 'Visa färre' }) : tr({ en: `Show all ${all.length}`, sv: `Visa alla ${all.length}` })}
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </aside>
      </div>
    </section>
  );
}
