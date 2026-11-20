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
            en: 'Engineer and economist working where business meets technology: system integration and solution design for global retail brands, in international teams.',
            sv: 'Civilingenjör och ekonom som arbetar där affär möter teknik: systemintegration och lösningsdesign för globala varumärken, i internationella team.',
          })}</p>
          <p className="hero-actions">
            <a className="btn" href="/cv/Adam-Englund-CV.pdf">{t({ en: 'Download CV (PDF)', sv: 'Ladda ner CV (PDF, engelska)' })}</a>
            <a className="btn ghost" href="#contact">{t({ en: 'Get in contact', sv: 'Hör av dig' })}</a>
          </p>
        </div>
        <div className="piccontainer">
          <img className="cv-pic" src="/img/pictures/CV-bild.jpg" alt="Adam Englund" />
        </div>
      </div>
      <a className="arrow" href="#about" aria-label={t({ en: 'Scroll down', sv: 'Scrolla ner' })} />
    </section>
  );
}
