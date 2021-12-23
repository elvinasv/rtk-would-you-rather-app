import React, { useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { QuestionList } from 'features/question/question-list';
import {
  selectAnsweredQuestionIds,
  selectUnansweredQuestionIds,
} from 'features/question/questionsSlice';
import css from './dashboard.module.scss';

const VISIBLE_TAB = {
  ANSWERED: 'answered',
  UNANSWERED: 'unanswered',
};
export function Dashboard() {
  const [visibleTab, setVisibleTab] = useState(VISIBLE_TAB.UNANSWERED);

  const answeredQuestionIds = useSelector(selectAnsweredQuestionIds);
  const unansweredQuestionIds = useSelector(selectUnansweredQuestionIds);

  const questionIdsByTab = {
    [VISIBLE_TAB.ANSWERED]: answeredQuestionIds,
    [VISIBLE_TAB.UNANSWERED]: unansweredQuestionIds,
  };

  console.log(visibleTab);
  return (
    <div className="container mw-500">
      <h2 className="text-center">Would you rather...</h2>
      <div className={css.questions}>
        <div className="card border-0">
          <div className="card-header bg-transparent">
            <ul className="nav nav-tabs card-header-tabs nav-justified">
              <li className="nav-item">
                <button
                  type="button"
                  className={classNames(
                    'nav-link',
                    visibleTab === VISIBLE_TAB.UNANSWERED && 'active'
                  )}
                  onClick={() => {
                    setVisibleTab(VISIBLE_TAB.UNANSWERED);
                  }}
                >
                  Unanswered
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={classNames(
                    'nav-link',
                    visibleTab === VISIBLE_TAB.ANSWERED && 'active'
                  )}
                  type="button"
                  onClick={() => {
                    setVisibleTab(VISIBLE_TAB.ANSWERED);
                  }}
                >
                  Answered
                </button>
              </li>
            </ul>
          </div>
          <div className="card-body mt-3 p-0">
            <QuestionList questionIds={questionIdsByTab[visibleTab]} />
          </div>
        </div>
      </div>
    </div>
  );
}
