import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { UserService } from './api/UserService';
import { YandexAPIRepository } from './repository/YandexAPIRepository';
import { createStore, RootState } from './store/store';
import { App } from './App';

import 'virtual:fonts.css';
import '@/assets/styles/App.scss';

let preloadedState: RootState | undefined;

if (typeof window !== 'undefined') {
  preloadedState = window.__PRELOADED_STATE__ as RootState;
  delete window.__PRELOADED_STATE__;
}

const store = createStore(new UserService(new YandexAPIRepository()), preloadedState);

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
