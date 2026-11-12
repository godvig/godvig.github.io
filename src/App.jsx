import React, { useState } from 'react';
import Header from './components/Header.jsx';
import SideDrawer from './components/SideDrawer.jsx';
import DrawerToggleButton from './components/DrawerToggleButton.jsx';
import Backdrop from './components/Backdrop.jsx';
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Projects from './components/Projects.jsx';
import LazyMap from './components/LazyMap.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const close = () => setDrawerOpen(false);

  return (
    <>
      <DrawerToggleButton open={drawerOpen} click={() => setDrawerOpen(o => !o)} />
      <SideDrawer show={drawerOpen} onNavigate={close} />
      {drawerOpen && <Backdrop click={close} />}

      <Header />
      <main>
        <Home />
        <Projects />
        <About />
        <Experience />
        <LazyMap />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
