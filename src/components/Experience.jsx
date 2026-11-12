import React from 'react';

const jobs = [
  {
    when: '2022 – now', role: 'Application Specialist', org: 'Centiro', place: 'Gothenburg',
    text: 'Integrate customers\' warehouse management systems, mostly SAP and Manhattan, with Centiro\'s TMS. Customers include Zalando and other global fashion, sportswear and luxury brands. Client contact, testing, project management and development in C#/.NET, from customer feedback to production deploy. Led a six-month product trial for a major fashion brand one month into the job.',
  },
  {
    when: '2021 – 2022', role: 'Purchase Planner, accessories', org: 'Volvo Cars', place: 'Gothenburg',
    text: 'Demand planning and sourcing for the Volvo aftermarket. Day-to-day contact with suppliers and the wider Volvo organisation, and longer-term work on supplier cooperation and product availability.',
  },
  {
    when: '2021', role: 'Master\'s thesis', org: 'IKEA Taiwan', place: 'Taipei',
    text: 'Closing the loop: a circular hub where used furniture is taken back, refurbished and resold.',
  },
  {
    when: '2020', role: 'Market Intelligence Intern', org: 'Evonik Industries', place: 'Taipei',
    text: 'Industry forecasts and market assessments for new products, supporting business development for the speciality chemicals group in Taiwan.',
  },
  {
    when: '2018 – 2019', role: 'Supply Chain Coordinator (summers)', org: 'Volvo Cars', place: 'Gothenburg',
  },
  {
    when: '2017', role: 'Chairman', org: 'ESTIEM Local Group Gothenburg', place: 'Gothenburg',
    text: 'Led the Gothenburg board of the European Students of Industrial Engineering and Management, organising events for students from across Europe, including a semi-final of TIMES, Europe\'s largest case competition.',
  },
  {
    when: '2017 – 2018', role: 'Developer and Marketer', org: 'eEducation Albert', place: 'Gothenburg',
    text: 'Field sales during the launch of the maths app, then content development during its expansion.',
  },
  {
    when: '2012 – 2014', role: 'Research Analyst', org: 'Godvig Capital Management', place: 'Luxembourg',
    text: 'Market analysis of companies on the Iraq Stock Exchange and input to the investment committee ahead of investment decisions.',
  },
  {
    when: '2011 – 2016', role: 'Equity Analyst, Financial Administrator and Board Member', org: 'Kurdistan Investment Company', place: 'Lund',
    text: 'An investment company focused on the Kurdistan Region of Iraq. Wrote the monthly fact sheets for investors, analysed companies on the Iraq Stock Exchange for the investment committee and managed part of the portfolio. Ran the bookkeeping towards the auditors, presented the financial statements to the board, and travelled to Erbil to help prepare the launch of the Erbil Stock Exchange.',
  },
];

const education = [
  ['Chalmers', 'M.Sc. Management and Economics of Innovation, minor in IT (2021)'],
  ['Lund University', 'B.Sc. Business and Economics, economics and public policy (2021)'],
  ['Chalmers', 'B.Sc. Industrial Engineering and Management, IT track (2019)'],
  ['Exchanges', 'Queen\'s University (Canada), Politecnico di Milano (Italy), UNITECH International programme (2019/20)'],
];

const languages = 'Swedish (native), English (fluent, IELTS 8.5), German (advanced), Italian (B1), Spanish (A2), and basic French, Luxembourgish, Danish and Norwegian.';

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
