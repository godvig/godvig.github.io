import React from 'react';
import { useT } from '../i18n.jsx';

export default function Home() {
  const t = useT();
  return (
    <section id="home" className="section2">
      <div className="rowsection">
        <div className="hello">
          <h1><span className="hi">{t({ en: 'Hi!', sv: 'Hej!' })}</span> <span className="name">{t({ en: "I'm Adam Englund", sv: 'Jag heter Adam Englund' })}</span></h1>
          <p className="tagline">{t({
            en: 'Engineer and economist based in Gothenburg. I work with system integrations and build tools that I want to use myself.',
            sv: 'Civilingenjör och ekonom i Göteborg. Jag arbetar med systemintegrationer och bygger verktyg som jag själv vill använda.',
          })}</p>
        </div>
        <div className="piccontainer">
          <img className="cv-pic" src="/img/pictures/CV-bild.jpg" alt="Adam Englund" />
        </div>
      </div>
      <a className="arrow" href="#about" aria-label={t({ en: 'Scroll down', sv: 'Scrolla ner' })} />
    </section>
  );
}
