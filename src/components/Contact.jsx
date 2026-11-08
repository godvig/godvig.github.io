import React from 'react';

const profiles = [
  { id: 'linkedin', href: 'https://linkedin.com/in/adamenglund', label: 'LinkedIn' },
  { id: 'facebook', href: 'https://facebook.com/adam.godvig.englund', label: 'Facebook' },
  { id: 'couchsurfing', href: 'https://couchsurfing.com/adam-englund', label: 'Couchsurfing' },
];

export default function Contact() {
  return (
    <section id="contact" className="page contact">
      <h2 className="page-header">Get in contact</h2>

      <div className="contact-container">
        {profiles.map(p => (
          <a key={p.id} className="contact-box" href={p.href} aria-label={p.label}>
            <span className={`profile-pic ${p.id}-pic`} />
            <span className={`profile-logo ${p.id}-logo`} />
          </a>
        ))}
      </div>

      <div className="phonemail">
        <a href="mailto:adamenglund3@gmail.com"><span className="icon mail" />adamenglund3@gmail.com</a>
        <a href="tel:+46723755170"><span className="icon telephone" />+46 (0)72 375 51 70</a>
      </div>
    </section>
  );
}
