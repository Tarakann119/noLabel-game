import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { matchPath } from 'react-router';
import { StaticRouter } from 'react-router-dom/server';

import { UserRepository, UserService } from './api/UserService';
import { userReducer } from './components/Autification/slice';
import { createStore } from './store/store';
import { App } from './App';
import { loadUser, Route, ROUTES } from './constants';

export async function render(url: string, repository: UserRepository) {
  const [pathname] = url.split('?');
  const store = createStore(new UserService(repository));

  // await loadUser(store.dispatch);

  const currentRoute = Object.values(ROUTES).find((route) => matchPath(pathname, route.path)) || {};

  // const { loader } = currentRoute as Route;

  // if (loader) {
  //   await loader(store.dispatch);
  // }

  // console.log(loader);

  store.dispatch(
    userReducer.actions.setUser({
      id: 1,
      login: 'test',
      password: 'test',
      first_name: 'test',
      second_name: 'test',
      display_name: 'test',
      email: 'test',
      phone: 'test',
      avatar: 'test',
    })
  );

  const initialState = store.getState();

  console.log(store.getState());

  const html = ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );

  return { html, initialState };
}
