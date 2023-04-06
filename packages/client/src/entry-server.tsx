import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { store } from '@store/store';

import { App } from './App';
import createCacheKey from './createCache';

export function render(url: string | Partial<Location>) {
  const cache = createCacheKey();

  const { extractCriticalToChunks, constructStyleTagsFromChunks, extractCritical } =
    createEmotionServer(cache);

  const initialState = store.getState();

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <CacheProvider value={cache}>
          <App />
        </CacheProvider>
      </Provider>
    </StaticRouter>
  );

  const chunks = extractCriticalToChunks(html);
  const styles = constructStyleTagsFromChunks(chunks);

  return { html, styles, initialState };
}
