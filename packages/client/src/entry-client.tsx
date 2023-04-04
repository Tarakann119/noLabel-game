import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { persistor, store } from '@store/store';
import { PersistGate } from 'redux-persist/integration/react';

import { App } from './App';

import 'virtual:fonts.css';
const cache = createCache({ key: 'css-key' });

import './index.scss';

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <CacheProvider value={cache}>
            <App />
          </CacheProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
