import React from 'react';

const jobs = [
  {
    when: '2022 – now', role: 'Application Specialist', org: 'Centiro', place: 'Gothenburg',
    text: 'Integrate customers\' warehouse management systems, mostly SAP and Manhattan, with Centiro\'s TMS. Customers include Zalando and other global fashion, sportswear and luxury brands. Client contact, testing, project management and development in C#/.NET, from customer feedback to production deploy. Led a six-month product trial for a major fashion brand one month into the job.',
  },
  {
    when: '2021 – 2022', role: 'Accessory Purchase Planner', org: 'Volvo Cars', place: 'Gothenburg',
    text: 'Parts supply and logistics.',
  },
  {
    when: '2021', role: 'Master\'s thesis', org: 'IKEA Taiwan', place: 'Taipei',
    text: 'Refurbish and resell: a circular hub for used furniture.',
  },
  {
    when: '2020', role: 'Market Intelligence Analyst', org: 'Evonik Industries', place: 'Taipei',
    text: 'Business intelligence internship.',
  },
  {
    when: '2018 – 2019', role: 'Supply Chain Coordinator (summers)', org: 'Volvo Cars', place: 'Gothenburg',
  },
  {
    when: '2017 – 2018', role: 'Developer and Marketer', org: 'Albert (eEducation Albert)', place: 'Gothenburg',
  },
  {
    when: '2011 – 2016', role: 'Equity Analyst, Financial Administrator and Board Member', org: 'Kurdistan Investment Company', place: 'Lund',
    text: 'An investment company focused on the Kurdistan Region of Iraq. Wrote the monthly fact sheets for investors, analysed companies on the Iraq Stock Exchange for the investment committee and managed part of the portfolio. Ran the bookkeeping towards the auditors, and travelled to Erbil to help prepare the launch of the Erbil Stock Exchange.',
  },
];

const education = [
  ['Chalmers', 'M.Sc. Management and Economics of Innovation, minor in IT'],
  ['Chalmers', 'B.Sc. Industrial Engineering and Management'],
  ['Lund University', 'B.Sc. Business and Economics'],
  ['Exchanges', 'Queen\'s University (Canada), Politecnico di Milano (Italy)'],
];

const languages = 'Swedish (native), English (fluent, IELTS 8.5), German, Danish and Norwegian, some French, Italian and Spanish.';

export default function Experience() {
  return (
    <section id="experience" className="page alt">
      <h2 className="page-header">Experience</h2>
      <ol className="timeline">
        {jobs.map(j => (
          <li key={j.when + j.org}>
            <span className="when">{j.when}</span>
            <div>
              <h3>{j.role} <span className="org">· {j.org}, {j.place}</span></h3>
              {j.text && <p>{j.text}</p>}
            </div>
          </li>
        ))}
      </ol>

      <h2 className="page-header small">Education</h2>
      <dl className="edu">
        {education.map(([k, v]) => (
          <React.Fragment key={v}><dt>{k}</dt><dd>{v}</dd></React.Fragment>
        ))}
        <dt>Languages</dt><dd>{languages}</dd>
      </dl>
    </section>
  );
}
