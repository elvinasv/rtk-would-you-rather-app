import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { ReactComponent as WarningIcon } from 'assets/warning-icon.svg';
import { DEMO_PASSWORD } from 'api/_DATA';
import { REQUEST_STATUS } from 'utils.js';

import { authorizeUser } from './authSlice';

export function LoginPage() {
  const history = useHistory();
  const { state: routerState } = useLocation();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('sarahedo');
  const [password, setPassword] = useState('');
  const [formSubmitStatus, setFormSubmitStatus] = useState(REQUEST_STATUS.idle);

  const canSubmit =
    [username, password].every(Boolean) &&
    formSubmitStatus === REQUEST_STATUS.idle;

  const onUsernameChange = (e) => {
    setUsername(e.target.value);
    setFormSubmitStatus(REQUEST_STATUS.idle);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
    setFormSubmitStatus(REQUEST_STATUS.idle);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitStatus(REQUEST_STATUS.loading);

    const resultAction = await dispatch(authorizeUser({ username, password }));

    if (resultAction.payload?.username) {
      history.push(routerState?.referrer || '/');
    } else {
      setFormSubmitStatus(REQUEST_STATUS.failed);
    }
  };

  return (
    <div className="container mw-500">
      <h2 className="text-center">Login page</h2>
      <form className="row" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="loginInputUsername" className="form-label">
            Username
          </label>
          <input
            type="text"
            id="loginInputEmail"
            className="form-control"
            value={username}
            onChange={onUsernameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="loginInputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="loginInputPassword"
            className="form-control"
            value={password}
            onChange={onPasswordChange}
            placeholder={`pass: ${DEMO_PASSWORD}`}
          />
        </div>
        <div className="text-center mb-3">
          <button
            type="submit"
            className="btn btn-primary px-5"
            disabled={!canSubmit}
          >
            Submit
          </button>
        </div>
        <div className="alerts">
          {formSubmitStatus === REQUEST_STATUS.failed && (
            <div
              className="alert alert-danger py-2 d-flex align-items-center"
              role="alert"
            >
              <WarningIcon width="24" height="24" className="me-2" />
              <div>Wrong username or password!</div>
            </div>
          )}
          <div className="alert alert-primary p-1 mb-3" role="alert">
            <p className="font-monospace text-primary fs-7 m-1">
              Demo users: [sarahedo, tylermcginnis, johndoe]
            </p>
            <p className="font-monospace text-primary fs-7 m-1">
              Demo password: {DEMO_PASSWORD}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
