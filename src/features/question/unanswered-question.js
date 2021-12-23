import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { OPTION_VALUE } from 'utils';
import { Avatar } from 'features/question/avatar';

import { selectUserById } from 'features/users/usersSlice';
import { selectQuestionById } from './questionsSlice';

export function UnansweredQuestion({ questionId }) {
  const history = useHistory();
  const question = useSelector((state) =>
    selectQuestionById(state, questionId)
  );
  const author = useSelector((state) => selectUserById(state, question.author));

  const [selectedOption, setSelectedOption] = useState(OPTION_VALUE.one);

  const onRadioInputChange = (e) => setSelectedOption(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.groupCollapsed('UnansweredQuestion: handlesSubmit');
    console.log(`selectedOption`, selectedOption);
    console.groupEnd();

    history.push('/');
  };

  const { name: authorName, avatarURL } = author;
  const { optionOne, optionTwo } = question;

  return (
    <form className="card mb-3 border" onSubmit={handleSubmit}>
      <div className="card-header text-start">{`${authorName} asks:`}</div>
      <div className="row g-0">
        <div className="col-3 d-flex flex-column align-items-center p-2 p-sm-3">
          <Avatar src={avatarURL} className="rounded-circle" />
        </div>
        <div className="col-9 p-3 text-start border-start">
          <h5>Would you rather...</h5>
          <div className="form-check mb-2">
            <input
              name="poll-options"
              id="question-option-1"
              className="form-check-input"
              type="radio"
              value={OPTION_VALUE.one}
              checked={selectedOption === OPTION_VALUE.one}
              onChange={onRadioInputChange}
            />
            <label className="form-check-label" htmlFor="question-option-1">
              {optionOne.text}
            </label>
          </div>
          <div className="form-check mb-3">
            <input
              name="poll-options"
              id="question-option-2"
              className="form-check-input"
              type="radio"
              value={OPTION_VALUE.two}
              checked={selectedOption === OPTION_VALUE.two}
              onChange={onRadioInputChange}
            />
            <label className="form-check-label" htmlFor="question-option-2">
              {optionTwo.text}
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

UnansweredQuestion.propTypes = {
  questionId: PropTypes.string,
};
