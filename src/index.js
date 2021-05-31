import React from 'react';

import ReactDOM from 'react-dom';

import App from './App';
import { IntlProviderWrapper } from "./IntlContext";

ReactDOM.render(
  <React.StrictMode>
    <IntlProviderWrapper>
      <App />
    </IntlProviderWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);
