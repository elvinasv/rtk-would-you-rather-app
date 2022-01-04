import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from './features/navigation/navigation';
import { Routes } from './features/navigation/routes';
import { AppWrapper } from './app/AppWrapper';

import css from './App.module.scss';

export function App() {
  return (
    <AppWrapper>
      <Router>
        <div className={css.app}>
          <Navigation />
          <Routes />
        </div>
      </Router>
    </AppWrapper>
  );
}
