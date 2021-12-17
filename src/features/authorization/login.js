import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function LoginPage() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.group('Login page: handleSubmit');
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    console.groupEnd();
    history.push('/');
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
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary px-5">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
