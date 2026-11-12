import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';

// The map and its geodata are the heaviest part of the page, so they load only when the visitor gets near.
const TravelMap = lazy(() => import('./TravelMap.jsx'));

function Placeholder({ innerRef }) {
  return (
    <section id="map" ref={innerRef} className="page map-page map-placeholder">
      <h2 className="page-header">Map</h2>
      <p className="text-block center">Where I've lived, worked and travelled. Loading the map…</p>
    </section>
  );
}

export default function LazyMap() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (show) return;
    if (!('IntersectionObserver' in window)) { setShow(true); return; }
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) setShow(true);
    }, { rootMargin: '800px 0px' });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [show]);

  if (!show) return <Placeholder innerRef={ref} />;
  return <Suspense fallback={<Placeholder />}><TravelMap /></Suspense>;
}
