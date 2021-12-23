import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import './custom.scss';

import { App } from './App';
import { store } from './app/store';
import { fetchUsers } from './features/users/usersSlice';
import { fetchQuestions } from './features/question/questionsSlice';

const persistor = persistStore(store);

// Fetch the list only once when the application starts.
store.dispatch(fetchUsers());
store.dispatch(fetchQuestions());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
