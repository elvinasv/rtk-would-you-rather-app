import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './features/navigation/navigation';
import Routes from './features/navigation/routes';

import css from './App.module.scss';

function App() {
  return (
    <Router>
      <div className={css.app}>
        <Navigation />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
