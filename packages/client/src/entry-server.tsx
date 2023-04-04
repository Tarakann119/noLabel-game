import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { store } from '@store/store';

import { App } from './App';

interface IRenderProps {
  path: string;
}

export function render({ path }: IRenderProps) {
  const cache = createCache({ key: 'css-key' });

  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const initialState = store.getState();

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={path}>
        <Provider store={store}>
          <CacheProvider value={cache}>
            <App />
          </CacheProvider>
        </Provider>
      </StaticRouter>
    </React.StrictMode>
  );

  const chunks = extractCriticalToChunks(html);
  const styles = constructStyleTagsFromChunks(chunks);

  return { html, styles, initialState };
}
