import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Avatar } from 'features/question/avatar';
import { selectQuestionById } from 'features/question/questionsSlice';
import { selectUserById } from 'features/users/usersSlice';

export function QuestionItem({ questionId }) {
  const {
    author: authorId,
    optionOne,
    timestamp,
  } = useSelector((state) => selectQuestionById(state, questionId));

  const { name: authorName, avatarURL } = useSelector((state) =>
    selectUserById(state, authorId)
  );

  const postedDate = new Date(timestamp).toLocaleDateString();

  return (
    <div className="card mb-3 border">
      <div className="card-header text-start d-flex justify-content-between">
        <p className="mb-0 me-3">{`${authorName} asks:`}</p>
        <p className="text-end mb-0">
          <small className="text-muted">{postedDate}</small>
        </p>
      </div>
      <div className="row g-0">
        <div className="col-3 d-flex flex-column align-items-center p-2 p-sm-3">
          <Avatar className="rounded-circle" src={avatarURL} />
        </div>
        <div className="col-9 p-3 text-start border-start">
          <h5>Would you rather...</h5>
          <p className="card-text">{`...${optionOne.text}`}</p>
          <Link
            to={`/questions/${questionId}`}
            className="btn btn-primary w-100"
          >
            Answer poll
          </Link>
        </div>
      </div>
    </div>
  );
}

QuestionItem.propTypes = {
  questionId: PropTypes.string,
};
