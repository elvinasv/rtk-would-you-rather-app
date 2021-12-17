import React from 'react';

import UnansweredQuestion from './unanswered-question';
import AnsweredQuestion from './answered-question';

export default function QuestionPage() {
  const isAnswered = false;

  return (
    <div className="container mw-500">
      {isAnswered ? <AnsweredQuestion /> : <UnansweredQuestion />}
    </div>
  );
}
