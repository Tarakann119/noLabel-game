import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './Store/store';

// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

test('Example test', async () => {
  const div = document.createElement('div');
  render(
    <Provider store={store}>
      {' '}
      <App />
    </Provider>
  );

  ReactDOM.unmountComponentAtNode(div);
});
