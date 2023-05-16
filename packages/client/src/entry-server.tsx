import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom/server';

import { UserRepository, UserService } from './api/UserService';
import { createStore } from './store/store';
import { loadUser } from './utils/loadUser';
import { App } from './App';

export async function render(url: string, repository: UserRepository) {
  const store = createStore(new UserService(repository));

  await loadUser(store.dispatch);

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
