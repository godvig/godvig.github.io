import React from 'react';

export default function Home() {
  return (
    <section id="home" className="section2">
      <div className="rowsection">
        <div className="hello">
          <h1>Hi!</h1>
          <p>I'm Adam</p>
          <p className="tagline">I connect warehouse systems to transport platforms for global retailers, at Centiro in Gothenburg.</p>
        </div>
        <div className="piccontainer">
          <img className="cv-pic" src="/img/pictures/CV-bild.jpg" alt="Adam Englund" />
        </div>
      </div>
      <a className="arrow" href="#about" aria-label="Scroll down" />
    </section>
  );
}
