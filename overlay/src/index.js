import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import OverlayApp from './OverlayApp';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <OverlayApp />
  </React.StrictMode>
);
