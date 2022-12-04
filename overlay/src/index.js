import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga';

import OverlayApp from './OverlayApp';

if (process.env.REACT_APP_GA_TRACKING_ID !== undefined) {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <OverlayApp />
  </React.StrictMode>
);
