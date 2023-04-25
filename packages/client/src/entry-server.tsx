import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';

import { store } from '@/store/store';

import { App } from './App';

export function render(url: string | Partial<Location>) {
  const initialState = store.getState();

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );

  return { html, initialState };
}
