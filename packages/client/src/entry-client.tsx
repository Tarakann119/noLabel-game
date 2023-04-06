import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { CacheProvider } from '@emotion/react';
import { store } from '@store/store';

import { App } from './App';

import 'virtual:fonts.css';

const cache = createCacheKey();

import createCacheKey from './createCache';

import './index.scss';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CacheProvider value={cache}>
          <App />
        </CacheProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
