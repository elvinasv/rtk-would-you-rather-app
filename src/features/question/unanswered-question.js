import React from 'react';

import Avatar from 'features/question/avatar';

export default function UnansweredQuestion() {
  return (
    <div className="card mb-3 border">
      <div className="card-header text-start">Sarah Edo asks:</div>
      <div className="row g-0">
        <div className="col-3 d-flex flex-column align-items-center p-2 p-sm-3">
          <Avatar className="rounded-circle" />
        </div>
        <div className="col-9 p-3 text-start border-start">
          <h5>Would you rather...</h5>
          <div className="form-check mb-2">
            <input
              className="form-check-input"
              type="radio"
              id="question-option-1"
              name="poll-options"
            />
            <label className="form-check-label" htmlFor="question-option-1">
              be a front-end developer
            </label>
          </div>
          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="radio"
              id="question-option-2"
              name="poll-options"
            />
            <label className="form-check-label" htmlFor="question-option-2">
              be a back-end developer
            </label>
          </div>
          <button type="button" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
