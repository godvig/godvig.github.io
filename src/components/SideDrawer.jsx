import React from 'react';

const links = [
  ['#home', 'HOME'],
  ['#projects', 'PROJECTS'],
  ['#about', 'ABOUT'],
  ['#experience', 'EXPERIENCE'],
  ['#map', 'MAP'],
  ['#contact', 'CONTACT'],
];

export default function SideDrawer({ show, onNavigate }) {
  return (
    <nav className={show ? 'side-drawer open' : 'side-drawer'} aria-hidden={!show}>
      <ul>
        {links.map(([href, label]) => (
          <li key={href}>
            <a href={href} onClick={onNavigate} tabIndex={show ? 0 : -1}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
