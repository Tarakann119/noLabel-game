import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { render } from '@testing-library/react';

import { App } from './App';

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
