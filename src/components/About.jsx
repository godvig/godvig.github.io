import React from 'react';
import { useT } from '../i18n.jsx';

const paragraphs = [
  {
    en: "I'm a Swede who grew up in Luxembourg and has since lived, studied or worked in the UK, Canada, Italy, Taiwan and Spain. I hold degrees in industrial engineering and innovation management from Chalmers and in economics from Lund University, and I like working where business and technology meet.",
    sv: 'Jag är svensk, uppvuxen i Luxemburg, och har sedan dess bott, pluggat eller jobbat i Storbritannien, Kanada, Italien, Taiwan och Spanien. Jag har examen i industriell ekonomi och innovationsekonomi från Chalmers och i nationalekonomi från Lunds universitet.',
  },
  {
    en: "Today I'm an Application Specialist at Centiro, connecting global retailers' warehouse systems to Centiro's transport management platform. I like the whole chain: talking to the customer, finding the real problem and shipping the fix myself.",
    sv: 'I dag är jag applikationsspecialist på Centiro, där jag kopplar ihop globala varumärkens lagersystem med Centiros transportplattform. Jag gillar hela kedjan: att prata med kunden, hitta det verkliga problemet och själv leverera lösningen.',
  },
  {
    en: "In my spare time I build tools I'd like to use myself, from a chess trainer that plays like your next opponent to a family-history app and a stock screener. You'll find them above, with the code on GitHub.",
    sv: 'På fritiden bygger jag verktyg som jag själv vill använda, från en schacktränare som spelar som din nästa motståndare till en släktforskningsapp och en aktiescreener. Du hittar dem ovan, med koden på GitHub.',
  },
];

export default function About() {
  const t = useT();
  return (
    <section id="about" className="page">
      <h2 className="page-header">{t({ en: 'About', sv: 'Om mig' })}</h2>
      <div className="text-block">
        {paragraphs.map((p, i) => <p key={i}>{t(p)}</p>)}
      </div>
    </section>
  );
}
