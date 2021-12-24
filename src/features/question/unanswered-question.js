import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { ReactComponent as WarningIcon } from 'assets/warning-icon.svg';
import { OPTION_VALUE, REQUEST_STATUS } from 'utils';
import { Avatar } from 'features/question/avatar';
import { selectUserById } from 'features/users/usersSlice';
import { selectQuestionById, addQuestionAnswer } from './questionsSlice';

export function UnansweredQuestion({ questionId }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const question = useSelector((state) =>
    selectQuestionById(state, questionId)
  );
  const author = useSelector((state) => selectUserById(state, question.author));

  const [formSubmitStatus, setFormSubmitStatus] = useState(REQUEST_STATUS.idle);
  const [selectedOption, setSelectedOption] = useState(OPTION_VALUE.one);

  const onRadioInputChange = (e) => {
    setSelectedOption(e.target.value);
    setFormSubmitStatus(REQUEST_STATUS.idle);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitStatus(REQUEST_STATUS.loading);

    try {
      const resultAction = await dispatch(
        addQuestionAnswer({
          questionId,
          answer: selectedOption,
        })
      );

      // TODO - dispatch user vote actions
      unwrapResult(resultAction);
      setFormSubmitStatus(REQUEST_STATUS.idle);
      history.push('/');
    } catch (error) {
      setFormSubmitStatus(REQUEST_STATUS.failed);
      console.log('error');
    }
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
          {formSubmitStatus === REQUEST_STATUS.failed && (
            <div
              className="alert alert-danger py-2 d-flex align-items-center"
              role="alert"
            >
              <WarningIcon width="24" height="24" className="me-2" />
              <div>Sorry, something went wrong!</div>
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={formSubmitStatus === REQUEST_STATUS.loading}
          >
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
