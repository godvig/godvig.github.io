import React from 'react';

export default function DrawerToggleButton({ click, open }) {
  return (
    <button className="toggle-button" onClick={click} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
      <div className="toggle-button__line" />
      <div className="toggle-button__line" />
      <div className="toggle-button__line" />
    </button>
  );
}
