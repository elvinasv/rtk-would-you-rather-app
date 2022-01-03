import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { OPTION_VALUE } from 'utils';
import { Avatar } from 'features/question/avatar';
import { selectAuthorizedUserId } from 'features/authorization/authSlice';
import { selectUserById } from 'features/users/usersSlice';
import { selectQuestionById, selectQuestionVoteStats } from './questionsSlice';
import { AnsweredQuestionOption } from './answered-question-option';

export function AnsweredQuestion({ questionId }) {
  const question = useSelector((state) =>
    selectQuestionById(state, questionId)
  );
  const author = useSelector((state) => selectUserById(state, question.author));
  const stats = useSelector((state) =>
    selectQuestionVoteStats(state, questionId)
  );
  const authorizedId = useSelector(selectAuthorizedUserId);
  const authUser = useSelector((state) => selectUserById(state, authorizedId));
  const userChoice = authUser.answers[questionId];

  const { name: authorName, avatarURL } = author;
  const { optionOne, optionTwo } = question;

  return (
    <div className="card mb-3 border">
      <div className="card-header text-start">{`${authorName} asks:`}</div>
      <div className="row g-0">
        <div className="col-3 d-flex flex-column align-items-center p-2 p-sm-3">
          <Avatar src={avatarURL} className="rounded-circle" />
        </div>
        <div className="col-9 p-3 text-start border-start">
          <h5>Results:</h5>
          <AnsweredQuestionOption
            optionText={optionOne.text}
            voteCount={stats.optionOne.count}
            votePercentage={stats.optionOne.percentage}
            totalVotes={stats.totalVotes.count}
            isHighlighted={stats.optionOne.count > stats.optionTwo.count}
            isUserChoice={userChoice === OPTION_VALUE.one}
          />
          <AnsweredQuestionOption
            optionText={optionTwo.text}
            voteCount={stats.optionTwo.count}
            votePercentage={stats.optionTwo.percentage}
            totalVotes={stats.totalVotes.count}
            isHighlighted={stats.optionOne.count < stats.optionTwo.count}
            isUserChoice={userChoice === OPTION_VALUE.two}
          />
        </div>
      </div>
    </div>
  );
}

AnsweredQuestion.propTypes = {
  questionId: PropTypes.string,
};
