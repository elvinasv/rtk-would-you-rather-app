import React from 'react';
import classNames from 'classnames';
import { Avatar } from 'features/question/avatar';
import css from './answered-question.module.scss';

export function AnsweredQuestion() {
  const isFirstVariant = true;
  return (
    <div className="card mb-3 border">
      <div className="card-header text-start">Sarah Edo asks:</div>
      <div className="row g-0">
        <div className="col-3 d-flex flex-column align-items-center p-2 p-sm-3">
          <Avatar className="rounded-circle" />
        </div>
        <div className="col-9 p-3 text-start border-start">
          <h5>Results:</h5>
          <div
            className={classNames(
              'card mb-3',
              isFirstVariant && 'border-success bg-opacity-10 bg-success'
            )}
          >
            <div
              className={classNames(
                'card-body d-flex flex-column',
                isFirstVariant && 'text-success'
              )}
            >
              <div className="card-title">
                Would you rather be a front-end developer?
              </div>
              <div className={`progress mb-2 ${css.progress}`}>
                <div
                  className="progress-bar bg-success"
                  style={{ width: '66.7%' }}
                >
                  66.7%
                </div>
              </div>
              <p className="card-text text-center">2 out of 3 votes</p>
            </div>
          </div>
          <div className="card bg-light">
            <div className="card-body d-flex flex-column">
              <span className="badge bg-warning mb-2 align-self-end">
                Your choice
              </span>
              <div className="card-title mb-3">
                Would you rather be a back-end developer?
              </div>
              <div className={`progress mb-2 ${css.progress}`}>
                <div
                  className="progress-bar bg-secondary"
                  style={{ width: '33.3%' }}
                >
                  33.3%
                </div>
              </div>
              <p className="card-text text-center">1 out of 3 votes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
