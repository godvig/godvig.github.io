import React from 'react';
import { useT } from '../i18n.jsx';

// url: the employer's website, opened from the logo. points: optional bullet list under the text.
// DRAFT: the language levels further down are a best guess that matches the CV. Confirm before publishing.
const jobs = [
  {
    when: { en: '2022 – now', sv: '2022 – idag' }, role: { en: 'Application Specialist', sv: 'Applikationsspecialist' }, org: 'Centiro', place: 'Borås',
    logo: 'centiro', url: 'https://www.centiro.com/',
    text: {
      en: 'Dedicated to one customer at a time and the most senior member of my current client team. Four months at the Barcelona office in 2024 and regular on-site work with customers across Europe and the US.',
      sv: 'Arbetar dedikerat mot en kund i taget och är den mest seniora i mitt nuvarande kundteam. Fyra månader på Barcelonakontoret 2024 och återkommande arbete på plats hos kunder i Europa och USA.',
    },
    points: [
      {
        en: 'Work closely with major international brands in fashion, sportswear and luxury retail as their day-to-day technical and business contact, integrating their warehouse management systems (mainly SAP, also Manhattan) with our transport management platform.',
        sv: 'Arbetar nära stora internationella varumärken inom mode, sport och lyx som deras dagliga tekniska och affärsmässiga kontakt, och integrerar deras lagersystem (främst SAP, även Manhattan) med vår transportplattform.',
      },
      {
        en: 'Own integrations end to end, from requirements and solution architecture to API integration, testing, go-live and hypercare, and ship code to production myself (C#/.NET).',
        sv: 'Äger integrationerna från början till slut, från krav och lösningsarkitektur till API-integration, test, driftsättning och hypercare, och driftsätter själv kod i produktion (C#/.NET).',
      },
      {
        en: 'Lead projects and take broad ownership of the user experience, serving as a key link between customers and our visibility, execution and finance product teams.',
        sv: 'Leder projekt och tar ett brett ansvar för användarupplevelsen, som en viktig länk mellan kunderna och våra produktteam för visibility, execution och finance.',
      },
    ],
  },
  {
    when: '2021 – 2022', role: { en: 'Purchase Planner, accessories', sv: 'Inköpsplanerare, tillbehör' }, org: 'Volvo Cars', place: { en: 'Gothenburg', sv: 'Göteborg' },
    logo: 'volvo', url: 'https://www.volvocars.com/',
    text: {
      en: 'Demand planning and sourcing for the Volvo aftermarket. Day-to-day contact with suppliers and the wider Volvo organisation, and longer-term work on supplier cooperation and product availability.',
      sv: 'Behovsplanering och inköp för Volvos eftermarknad. Daglig kontakt med leverantörer och resten av Volvo, och långsiktigt arbete med leverantörssamarbete och produkttillgänglighet.',
    },
  },
  {
    when: '2021', role: { en: 'Master\'s thesis', sv: 'Examensarbete' }, org: 'IKEA Taiwan', place: 'Taipei',
    logo: 'ikea', url: 'https://www.ikea.com.tw/',
    link: { href: 'https://odr.chalmers.se/handle/20.500.12380/303697', label: { en: 'Read the thesis', sv: 'Läs rapporten' } },
    text: {
      en: 'Closing the loop: a circular hub where used furniture is taken back, refurbished and resold.',
      sv: 'Att sluta cirkeln: ett cirkulärt nav där begagnade möbler tas tillbaka, rustas upp och säljs igen.',
    },
  },
  {
    when: '2020', role: { en: 'Market Intelligence Intern', sv: 'Praktikant, omvärldsanalys' }, org: 'Evonik Industries', place: 'Taipei',
    logo: 'evonik', url: 'https://www.evonik.com/',
    text: {
      en: 'Industry forecasts and market assessments for new products, supporting business development for the speciality chemicals group in Taiwan.',
      sv: 'Branschprognoser och marknadsbedömningar för nya produkter, som stöd till affärsutvecklingen för specialkemikoncernen i Taiwan.',
    },
  },
  {
    when: '2018 – 2019', role: { en: 'Supply Chain Coordinator (summers)', sv: 'Supply chain-koordinator (somrar)' }, org: 'Volvo Cars', place: { en: 'Gothenburg', sv: 'Göteborg' },
    logo: 'volvo', url: 'https://www.volvocars.com/',
  },
  {
    when: '2017', role: { en: 'Chairman', sv: 'Ordförande' }, org: 'ESTIEM Local Group Gothenburg', place: { en: 'Gothenburg', sv: 'Göteborg' },
    logo: 'estiem', url: 'https://estiem.org/',
    text: {
      en: 'Led the Gothenburg board of the European Students of Industrial Engineering and Management, organising events for students from across Europe, including a semi-final of TIMES, Europe\'s largest case competition. Presented Chalmers\' master\'s programmes to hundreds of students at ESTIEM Council Meetings in Poznań and Izmir.',
      sv: 'Ledde Göteborgsstyrelsen för European Students of Industrial Engineering and Management och arrangerade evenemang för studenter från hela Europa, bland annat en semifinal i TIMES, Europas största case-tävling. Presenterade Chalmers masterprogram för hundratals studenter på ESTIEM:s rådsmöten i Poznań och Izmir.',
    },
  },
  {
    when: '2017 – 2018', role: { en: 'Developer and Marketer', sv: 'Utvecklare och marknadsförare' }, org: 'eEducation Albert', place: { en: 'Gothenburg', sv: 'Göteborg' },
    text: {
      en: 'Field sales during the launch of the maths app, then content development during its expansion.',
      sv: 'Fältförsäljning när matteappen lanserades, sedan innehållsutveckling när den växte.',
    },
  },
  {
    when: '2012 – 2014', role: { en: 'Research Analyst', sv: 'Analytiker' }, org: 'Godvig Capital Management', place: { en: 'Luxembourg', sv: 'Luxemburg' },
    logo: 'gcm',
    text: {
      en: 'Market analysis of companies on the Iraq Stock Exchange and input to the investment committee ahead of investment decisions.',
      sv: 'Marknadsanalys av bolag på Iraks börs och underlag till investeringskommittén inför investeringsbeslut.',
    },
  },
  {
    when: '2011 – 2016', role: { en: 'Equity Analyst, Financial Administrator and Board Member', sv: 'Aktieanalytiker, ekonomiansvarig och styrelseledamot' }, org: 'Kurdistan Investment Company', place: 'Lund',
    logo: 'kic',
    text: {
      en: 'An investment company focused on the Kurdistan Region of Iraq. Wrote the monthly fact sheets for investors, analysed companies on the Iraq Stock Exchange for the investment committee and managed part of the portfolio. Ran the bookkeeping towards the auditors, presented the financial statements to the board, and travelled to Erbil to help prepare the launch of the Erbil Stock Exchange.',
      sv: 'Ett investmentbolag med fokus på Kurdistanregionen i Irak. Skrev de månatliga faktabladen till investerarna, analyserade bolag på Iraks börs åt investeringskommittén och förvaltade en del av portföljen. Skötte bokföringen mot revisorerna, presenterade bokslutet för styrelsen och reste till Erbil för att hjälpa till inför lanseringen av Erbilbörsen.',
    },
  },
];

const education = [
  ['Chalmers', { en: 'M.Sc. in Engineering (Swedish civilingenjör), Management and Economics of Innovation (2021)', sv: 'Civilingenjörsexamen, innovationsekonomi (2021)' }],
  [{ en: 'Lund University', sv: 'Lunds universitet' }, { en: 'B.Sc. Business and Economics, economics and public policy (2021)', sv: 'Ekonomie kandidatexamen, nationalekonomi och offentlig politik (2021)' }],
  ['Chalmers', { en: 'B.Sc. Industrial Engineering and Management, minor in IT (2019)', sv: 'Kandidatexamen, industriell ekonomi med inriktning IT (2019)' }],
  ['UNITECH International', { en: 'Selected through assessment centres for the European network of leading technical universities and multinational companies (2019–2021)', sv: 'Antagen via assessment center till det europeiska nätverket av ledande tekniska universitet och multinationella företag (2019–2021)' }],
  [{ en: 'Exchanges', sv: 'Utbyten' }, { en: 'Queen\'s University, Smith School of Business (Canada, 2014) and Politecnico di Milano (Italy, 2019)', sv: 'Queen\'s University, Smith School of Business (Kanada, 2014) och Politecnico di Milano (Italien, 2019)' }],
];

const writing = [
  {
    title: 'Closing the Loop: Adapting a Circular Business Model for IKEA Taiwan',
    meta: { en: 'M.Sc. thesis · Chalmers · 2021 · with Arvid Börjesson Hanson', sv: 'Examensarbete · Chalmers · 2021 · med Arvid Börjesson Hanson' },
    text: {
      en: 'How IKEA Taiwan could take back, refurbish and resell used furniture, based on interviews with other IKEA markets and a consumer survey in Taiwan.',
      sv: 'Hur IKEA Taiwan skulle kunna ta tillbaka, rusta upp och sälja begagnade möbler, utifrån intervjuer med andra IKEA-marknader och en konsumentenkät i Taiwan.',
    },
    href: 'https://odr.chalmers.se/handle/20.500.12380/303697',
  },
  {
    title: 'Auto-generated Web Application for User Acquisition through SEO within Women\'s Football',
    meta: { en: 'B.Sc. thesis · Chalmers and University of Gothenburg · 2019 · with Forza Football', sv: 'Kandidatarbete · Chalmers och Göteborgs universitet · 2019 · med Forza Football' },
    text: {
      en: 'A livescore site with auto-generated pages for women\'s football, built to test how search rankings can bring users to a mobile app.',
      sv: 'En livescore-sajt med automatiskt genererade sidor för damfotboll, byggd för att testa hur sökmotorplaceringar kan ge användare till en mobilapp.',
    },
    href: 'https://hdl.handle.net/20.500.12380/301899',
  },
  {
    title: 'Höghastighetsjärnvägar i Sverige: En samhällsekonomisk analys',
    meta: { en: 'B.Sc. thesis in Swedish · Lund University · 2021', sv: 'Kandidatuppsats · Lunds universitet · 2021' },
    text: {
      en: 'A cost-benefit analysis of high-speed rail in Sweden, which comes out very unprofitable, and a discussion of how much such analyses really steer big public investments.',
      sv: 'En samhällsekonomisk kalkyl för höghastighetståg i Sverige, som visar sig mycket olönsam, och en diskussion om hur mycket sådana kalkyler egentligen styr stora offentliga investeringar.',
    },
    href: 'https://lup.lub.lu.se/student-papers/record/9036323',
  },
];

const languages = {
  en: 'Swedish (native), English (fluent, IELTS 8.5), Danish and Norwegian (professional working), German (strong foundation, currently refreshing), Italian (B1), Spanish (A2), and basic French and Luxembourgish.',
  sv: 'Svenska (modersmål), engelska (flytande, IELTS 8,5), danska och norska (goda kunskaper i arbetet), tyska (god grund, fräschas upp), italienska (B1), spanska (A2) samt grundläggande franska och luxemburgiska.',
};

function Logo({ job }) {
  const inner = job.logo
    ? <img src={`/img/employers/${job.logo}.png`} alt="" loading="lazy" />
    : <span className="logo-initial">{job.org[0]}</span>;
  if (!job.url) return <span className="logo" aria-hidden="true">{inner}</span>;
  return (
    <a className="logo" href={job.url} target="_blank" rel="noopener noreferrer" aria-label={`${job.org} (website)`} title={job.org}>
      {inner}
    </a>
  );
}

export default function Experience() {
  const t = useT();
  return (
    <section id="experience" className="page alt">
      <h2 className="page-header">{t({ en: 'Experience', sv: 'Erfarenhet' })}</h2>
      <ol className="timeline">
        {jobs.map(j => (
          <li key={t(j.when) + j.org + t(j.role)}>
            <span className="when">{t(j.when)}</span>
            <div className="job">
              <Logo job={j} />
              <div>
                <h3>{t(j.role)} <span className="org">· {j.org}, {t(j.place)}</span></h3>
                {j.text && <p>{t(j.text)}</p>}
                {j.points && <ul className="points">{j.points.map((pt, i) => <li key={i}>{t(pt)}</li>)}</ul>}
                {j.link && <p><a href={j.link.href} target="_blank" rel="noopener noreferrer">{t(j.link.label)} ↗</a></p>}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <h2 className="page-header small">{t({ en: 'Education', sv: 'Utbildning' })}</h2>
      <dl className="edu">
        {education.map(([k, v]) => (
          <React.Fragment key={t(v)}><dt>{t(k)}</dt><dd>{t(v)}</dd></React.Fragment>
        ))}
        <dt>{t({ en: 'Languages', sv: 'Språk' })}</dt><dd>{t(languages)}</dd>
      </dl>

      <h2 className="page-header small">{t({ en: 'Selected writing', sv: 'Rapporter och uppsatser' })}</h2>
      <ul className="writing">
        {writing.map(w => (
          <li key={w.href}>
            <a href={w.href} target="_blank" rel="noopener noreferrer">{w.title} ↗</a>
            <span className="meta">{t(w.meta)}</span>
            <p>{t(w.text)}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
