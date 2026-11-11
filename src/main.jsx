import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import '@fontsource-variable/mona-sans/wdth.css';
import './styles.css';

createRoot(document.getElementById('app')).render(<App />);
