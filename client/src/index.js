import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from './App';
import { IntlProviderWrapper } from "./IntlContext";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <IntlProviderWrapper>
      <App />
    </IntlProviderWrapper>
  </React.StrictMode>
);
