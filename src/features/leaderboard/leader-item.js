import React from 'react';

import Avatar from 'features/questions/avatar';

export default function LeaderItem() {
  return (
    <div className="card mb-3 border">
      <div className="row g-0">
        <div className="col-3 d-flex flex-column align-items-center p-2 p-sm-3">
          <Avatar className="rounded-circle" />
        </div>
        <div className="col-5 p-2 text-start">
          <h5>Sarah Edo</h5>
          <hr />
          <p>Answered questions: 4</p>
          <p className="m-0">Created questions: 3</p>
        </div>
        <div className="col-4 p-2 text-center">
          <div className="card">
            <div className="card-header">Score</div>
            <div className="card-body">
              <h5 className="m-2">10</h5>
            </div>
          </div>
        </div>
      </div>
      <span className="position-absolute end-0 badge badge bg-warning text-dark w-auto x-2 fs-6">
        1
      </span>
    </div>
  );
}
