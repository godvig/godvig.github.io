import React from 'react';
import { useT } from '../i18n.jsx';

// url: the employer's website, opened from the logo
const jobs = [
  {
    when: { en: '2022 – now', sv: '2022 – idag' }, role: { en: 'Application Specialist', sv: 'Applikationsspecialist' }, org: 'Centiro', place: { en: 'Gothenburg', sv: 'Göteborg' },
    logo: 'centiro', url: 'https://www.centiro.com/',
    text: {
      en: 'Integrate customers\' warehouse management systems, mostly SAP and Manhattan, with Centiro\'s TMS. Customers include Zalando and other global fashion, sportswear and luxury brands. Client contact, testing, project management and development in C#/.NET, from customer feedback to production deploy. Led a six-month product trial for a major fashion brand one month into the job.',
      sv: 'Integrerar kunders lagersystem, främst SAP och Manhattan, med Centiros TMS. Bland kunderna finns Zalando och andra globala mode-, sport- och lyxvarumärken. Kundkontakt, test, projektledning och utveckling i C#/.NET, från kundens feedback till driftsättning. Ledde en sex månader lång produkttest för ett stort modevarumärke redan efter en månad på jobbet.',
    },
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
      en: 'Led the Gothenburg board of the European Students of Industrial Engineering and Management, organising events for students from across Europe, including a semi-final of TIMES, Europe\'s largest case competition.',
      sv: 'Ledde Göteborgsstyrelsen för European Students of Industrial Engineering and Management och arrangerade evenemang för studenter från hela Europa, bland annat en semifinal i TIMES, Europas största case-tävling.',
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
    when: '2011 – 2015', role: { en: 'Equity Analyst, Financial Administrator and Board Member', sv: 'Aktieanalytiker, ekonomiansvarig och styrelseledamot' }, org: 'Kurdistan Investment Company', place: 'Lund',
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
  [{ en: 'Exchanges', sv: 'Utbyten' }, { en: 'Queen\'s University (Canada), Politecnico di Milano (Italy), UNITECH International programme (2019/20)', sv: 'Queen\'s University (Kanada), Politecnico di Milano (Italien), UNITECH International-programmet (2019/20)' }],
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
    meta: { en: 'B.Sc. thesis · Chalmers and University of Gothenburg · 2019 · with Forza Football, in a group of six', sv: 'Kandidatarbete · Chalmers och Göteborgs universitet · 2019 · med Forza Football, i en grupp om sex' },
    text: {
      en: 'A livescore site for women\'s football (Next.js and React on Forza Football\'s data) that generated a page for every match, team, tournament and player, to test whether search rankings can bring users to a mobile app. In its first two months it ranked first for several targeted searches and passed 350,000 impressions on Google.',
      sv: 'En livescore-sajt för damfotboll (Next.js och React på Forza Footballs data) som genererade en sida för varje match, lag, turnering och spelare, för att testa om sökmotorplaceringar kan ge användare till en mobilapp. Under de första två månaderna rankades den etta på flera av de sökord vi siktade på och fick över 350 000 visningar på Google.',
    },
    href: 'https://hdl.handle.net/20.500.12380/301899',
  },
  {
    title: 'Höghastighetsjärnvägar i Sverige: En samhällsekonomisk analys',
    meta: { en: 'B.Sc. thesis in Swedish · Lund University · 2021', sv: 'Kandidatuppsats · Lunds universitet · 2021' },
    text: {
      en: 'A cost-benefit analysis of high-speed rail in Sweden. The project comes out deeply unprofitable, so the thesis asks why such investments are made anyway, and finds part of the answer in public choice theory: the incentives of politicians, regions and agencies can outweigh the calculations.',
      sv: 'En samhällsekonomisk kalkyl för höghastighetståg i Sverige. Projektet visar sig mycket olönsamt, så uppsatsen frågar varför sådana investeringar görs ändå och hittar en del av svaret i public choice-teori: politikers, regioners och myndigheters drivkrafter kan väga tyngre än kalkylerna.',
    },
    href: 'https://lup.lub.lu.se/student-papers/record/9036323',
  },
];

const languages = {
  en: 'Swedish (native), English (fluent, IELTS 8.5), German (advanced), Italian (B1), Spanish (A2), and basic French, Luxembourgish, Danish and Norwegian.',
  sv: 'Svenska (modersmål), engelska (flytande, IELTS 8,5), tyska (avancerad), italienska (B1), spanska (A2) samt grundläggande franska, luxemburgiska, danska och norska.',
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
