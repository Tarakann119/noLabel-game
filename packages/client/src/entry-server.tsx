import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import { store } from '@store/store';

import { App } from './App';
import Test from './Test';

interface IRenderProps {
  path: string;
}

export function render(url: string | Partial<Location>) {
  const cache = createCache({ key: 'css-key' });

  const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache);

  const initialState = store.getState();

  const html = ReactDOMServer.renderToString(
    // <StaticRouter location={path}>
    //   <Provider store={store}>
    //     <CacheProvider value={cache}>
    //       {/* <App /> */}
    //       <Test />
    //     </CacheProvider>
    //   </Provider>
    // </StaticRouter>
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
