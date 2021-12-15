import React from 'react';

export default function LoginPage() {
  return (
    <div className="container mw-500">
      <h2 className="text-center">Please login</h2>
      <form className="row">
        <div className="mb-3">
          <label htmlFor="loginInputUsername" className="form-label">
            Username
          </label>
          <input type="text" className="form-control" id="loginInputEmail" />
        </div>
        <div className="mb-3">
          <label htmlFor="loginInputPassword" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="loginInputPassword"
            className="form-control"
          />
        </div>
        <div className="text-center">
          <button type="button" className="btn btn-primary px-5">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
