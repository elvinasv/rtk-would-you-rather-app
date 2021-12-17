import React from 'react';
import { Link } from 'react-router-dom';

// Navbar collapse on md screens controlled by the Bootstrap v5
function Navigation() {
  const isLoggedIn = true;

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light mb-3">
      <div className="container-md">
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-burger"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className="navbar-collapse justify-content-md-center collapse"
          id="navbar-burger"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link">
                Add question
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/leaderboard" className="nav-link">
                Leaderboard
              </Link>
            </li>
            {isLoggedIn ? (
              <>
                <span className="navbar-text ms-md-4 fw-bold order-md-0 order-first">
                  Hi, Sarah Edo!
                </span>
                <li className="nav-item">
                  <Link to="/logout" className="nav-link">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Sign in
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
