import React from 'react';

import ReactDOM from 'react-dom';

import OverlayApp from './OverlayApp';
import { IntlProviderWrapper } from "./IntlContext";

ReactDOM.render(
  <React.StrictMode>
    <IntlProviderWrapper>
      <OverlayApp />
    </IntlProviderWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);
