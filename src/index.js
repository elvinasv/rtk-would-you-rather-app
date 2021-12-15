import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './custom.scss';

import App from './App';
import { store } from './app/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
