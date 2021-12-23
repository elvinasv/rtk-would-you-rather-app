import React from 'react';
import PropTypes from 'prop-types';
import { QuestionItem } from 'features/question/question-item';

export function QuestionList({ questionIds }) {
  return (
    <div>
      {questionIds.length ? (
        questionIds.map((id) => <QuestionItem key={id} questionId={id} />)
      ) : (
        <div className="text-center">
          <h2>No questions found!</h2>
          <p>¯\_(ツ)_/¯</p>
        </div>
      )}
    </div>
  );
}

QuestionList.propTypes = {
  questionIds: PropTypes.arrayOf(PropTypes.string),
};
