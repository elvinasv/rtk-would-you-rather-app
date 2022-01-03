import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  isAuthorizedUser,
  selectAuthorizedUserId,
  logoutUser,
} from 'features/authorization/authSlice';
import { selectUserById } from 'features/users/usersSlice';

// Navbar collapse on md screens controlled by the Bootstrap v5
export function Navigation() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(isAuthorizedUser);
  const authorizedId = useSelector(selectAuthorizedUserId);
  const authUser = useSelector((state) => selectUserById(state, authorizedId));

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
                  {`Hi, ${authUser.name}!`}
                </span>
                <li className="nav-item">
                  <button
                    type="button"
                    className="nav-link bg-transparent border-0"
                    onClick={() => {
                      dispatch(logoutUser());
                    }}
                  >
                    Logout
                  </button>
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
