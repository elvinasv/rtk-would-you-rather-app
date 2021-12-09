import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navigation from './features/navigation/navigation';
import Routes from './features/navigation/routes';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes />
      </div>
    </Router>
  );
}

export default App;
