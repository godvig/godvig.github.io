import React from 'react';

export default function About() {
  return (
    <section id="about" className="page">
      <h2 className="page-header">About</h2>
      <div className="text-block">
        <p>
          I'm a Swede who grew up in Luxembourg and has since lived, studied or worked in the UK, Canada, Italy,
          Taiwan and Spain. I hold degrees in industrial engineering and innovation management from Chalmers and in
          economics from Lund University, and I like working where business and technology meet.
        </p>
        <p>
          Today I'm an Application Specialist at Centiro, connecting global retailers' warehouse systems to Centiro's
          transport management platform. I like the whole chain: talking to the customer, finding the real problem
          and shipping the fix myself.
        </p>
        <p>
          In my spare time I build tools I'd like to use myself, from a chess trainer that plays like your next
          opponent to a family-history app and a stock screener. You'll find them above, with the code on GitHub.
        </p>
      </div>
    </section>
  );
}
