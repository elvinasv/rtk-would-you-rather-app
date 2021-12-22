import React from 'react';

import { QuestionItem } from '../question/question-item';

import css from './dashboard.module.scss';

export function Dashboard() {
  return (
    <div className="container mw-500">
      <h2 className="text-center">Would you rather...</h2>
      <div className={css.questions}>
        <div className="card border-0">
          <div className="card-header bg-transparent">
            <ul className="nav nav-tabs card-header-tabs nav-justified">
              <li className="nav-item">
                <a className="nav-link active" href="/">
                  Unanswered
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/#answered">
                  Answered
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body mt-3 p-0">
            <QuestionItem />
            <QuestionItem />
            <QuestionItem />
            <QuestionItem />
          </div>
        </div>
      </div>
    </div>
  );
}
