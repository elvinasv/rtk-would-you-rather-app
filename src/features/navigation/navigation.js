import React from 'react';

// Navbar collapse on md screens controlled by the Bootstrap v5
function Navigation() {
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light">
      <div className="container-fluid">
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-burger"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="navbar-collapse justify-content-md-center"
          id="navbar-burger"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" href="#test_1">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#test_2">
                New Poll
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#test_3">
                Leaderboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#test_4">
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
