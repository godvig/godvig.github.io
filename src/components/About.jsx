import React from 'react';

export default function About() {
  return (
    <section id="about" className="page">
      <h2 className="page-header">About</h2>
      <div className="text-block">
        <p>
          I'm a Swede who grew up in Luxembourg and has since lived, studied or worked in the UK, Canada, Italy,
          Taiwan and Spain. I studied industrial engineering and innovation management at Chalmers and economics at
          Lund University.
        </p>
        <p>
          Today I work as an Application Specialist at Centiro, where I integrate global retailers' warehouse systems
          with Centiro's transport management platform. I like the whole chain: talking to the customer, figuring out
          what's actually wrong, and shipping the fix myself.
        </p>
        <p>
          In the evenings I build small things: a market data dashboard, a plugin for SteamOS, and a Greek-themed
          town for Heroes of Might and Magic III with a friend. I first built this site in 2019 to learn React,
          and I'm still improving it.
        </p>
      </div>
    </section>
  );
}
