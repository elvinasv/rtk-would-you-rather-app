import React from 'react';

import Avatar from 'features/questions/avatar';

export default function QuestionItem() {
  return (
    <div className="card mb-3 border">
      <div className="card-header text-start">Asked by Sarah Edo</div>
      <div className="row g-0">
        <div className="col-4 d-flex flex-column align-items-center p-3">
          <Avatar className="rounded-circle" />
        </div>
        <div className="col-8 p-2 text-start">
          <h5>Would you rather...</h5>
          <p className="card-text">...be a front-end developer or...</p>
          <a href="/" className="btn btn-primary w-100">
            Answer
          </a>
        </div>
      </div>
    </div>
  );
}
