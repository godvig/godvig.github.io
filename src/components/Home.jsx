import React from 'react';

export default function Home() {
  return (
    <section id="home" className="section2">
      <div className="rowsection">
        <div className="hello">
          <h1><span className="hi">Hi!</span> <span className="name">I'm Adam Englund</span></h1>
          <p className="tagline">Engineer and economist based in Gothenburg. I work with logistics integrations by day and build my own tools by night.</p>
        </div>
        <div className="piccontainer">
          <img className="cv-pic" src="/img/pictures/CV-bild.jpg" alt="Adam Englund" />
        </div>
      </div>
      <a className="arrow" href="#about" aria-label="Scroll down" />
    </section>
  );
}
