import React from 'react';
import { useT } from '../i18n.jsx';

export default function Footer() {
  const t = useT();
  return (
    <footer>
      <p className="footerText">© Adam Englund 2019–{new Date().getFullYear()}</p>
      <p className="footerNote">{t({ en: 'Visits are counted anonymously, without cookies.', sv: 'Besök räknas anonymt, utan kakor.' })}</p>
    </footer>
  );
}
