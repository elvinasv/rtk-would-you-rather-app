import React from 'react';

import { Avatar } from 'features/question/avatar';

export function QuestionItem() {
  return (
    <div className="card mb-3 border">
      <div className="card-header text-start">Sarah Edo asks:</div>
      <div className="row g-0">
        <div className="col-3 d-flex flex-column align-items-center p-2 p-sm-3">
          <Avatar className="rounded-circle" />
        </div>
        <div className="col-9 p-3 text-start border-start">
          <h5>Would you rather...</h5>
          <p className="card-text">...be a front-end developer or...</p>
          <a href="/questions/test123" className="btn btn-primary w-100">
            Answer poll
          </a>
        </div>
      </div>
    </div>
  );
}
