import React from 'react';
import { useLang, useSetLang } from '../i18n.jsx';

const links = [
  ['#home', 'HOME', 'HEM'],
  ['#projects', 'PROJECTS', 'PROJEKT'],
  ['#about', 'ABOUT', 'OM MIG'],
  ['#experience', 'EXPERIENCE', 'ERFARENHET'],
  ['#map', 'MAP', 'KARTA'],
  ['#contact', 'CONTACT', 'KONTAKT'],
];

const FlagGB = () => (
  <svg viewBox="0 0 60 30" aria-hidden="true">
    <clipPath id="gb-c"><path d="M0,0 v30 h60 v-30 z" /></clipPath>
    <clipPath id="gb-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
    <g clipPath="url(#gb-c)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#gb-t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

const FlagSE = () => (
  <svg viewBox="0 0 16 10" aria-hidden="true">
    <path d="M0,0 h16 v10 h-16 z" fill="#006AA7" />
    <path d="M5,0 h2 v10 h-2 z M0,4 h16 v2 h-16 z" fill="#FECC02" />
  </svg>
);

export default function SideDrawer({ show, onNavigate }) {
  const lang = useLang();
  const setLang = useSetLang();
  const tab = show ? 0 : -1;
  return (
    <nav className={show ? 'side-drawer open' : 'side-drawer'} aria-hidden={!show}>
      <ul>
        {links.map(([href, en, sv]) => (
          <li key={href}>
            <a href={href} onClick={onNavigate} tabIndex={tab}>{lang === 'sv' ? sv : en}</a>
          </li>
        ))}
        <li className="lang-switch" role="group" aria-label={lang === 'sv' ? 'Språk' : 'Language'}>
          <button className={lang === 'en' ? 'on' : ''} aria-pressed={lang === 'en'} onClick={() => setLang('en')} tabIndex={tab} title="English" lang="en">
            <FlagGB /><span>English</span>
          </button>
          <button className={lang === 'sv' ? 'on' : ''} aria-pressed={lang === 'sv'} onClick={() => setLang('sv')} tabIndex={tab} title="Svenska" lang="sv">
            <FlagSE /><span>Svenska</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}
