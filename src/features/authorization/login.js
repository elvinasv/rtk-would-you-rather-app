import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { DEMO_PASSWORD } from 'api/_DATA';

import { authorizeUser } from './authSlice';

export default function LoginPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('sarahedo');
  const [password, setPassword] = useState('');

  const canSubmit = [username, password].every(Boolean);

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultAction = await dispatch(authorizeUser({ username, password }));

    if (resultAction.payload?.username) {
      history.push('/');
    }
  };

  return (
    <div className="container mw-500">
      <h2 className="text-center">Please login</h2>
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
