import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import {
  selectAnsweredQuestionIds,
  selectQuestionIds,
} from 'features/question/questionsSlice';
import { UnansweredQuestion } from './unanswered-question';
import { AnsweredQuestion } from './answered-question';

export function QuestionPage() {
  const history = useHistory();
  const { questionId } = useParams();
  const answeredQuestions = useSelector(selectAnsweredQuestionIds);
  const isExistingQuestion =
    useSelector(selectQuestionIds).includes(questionId);

  const isAnswered = answeredQuestions.includes(questionId);

  if (!isExistingQuestion) {
    history.push('/404');
  }

  return (
    <div className="container mw-500">
      {isAnswered
        ? isExistingQuestion && <AnsweredQuestion questionId={questionId} />
        : isExistingQuestion && <UnansweredQuestion questionId={questionId} />}
    </div>
  );
}
