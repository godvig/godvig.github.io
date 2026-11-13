import React from 'react';

const profiles = [
  { id: 'linkedin', href: 'https://linkedin.com/in/adamenglund', label: 'LinkedIn' },
  { id: 'github', href: 'https://github.com/godvig', label: 'GitHub' },
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
        <a href="mailto:adamenglund@godvig.com"><span className="icon mail" />adamenglund@godvig.com</a>
      </div>
    </section>
  );
}
