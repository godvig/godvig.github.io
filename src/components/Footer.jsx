import React from 'react';

export default function Footer() {
  return (
    <footer>
      <p className="footerText">© Adam Englund 2019–{new Date().getFullYear()}</p>
    </footer>
  );
}
