import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { REQUEST_STATUS } from 'utils.js';
import { addQuestion } from 'features/question/questionsSlice';
import { selectAuthorizedUserId } from 'features/authorization/authSlice';
import { addUserQuestion } from 'features/users/usersSlice';

export function AddQuestionForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const authorizedUser = useSelector(selectAuthorizedUserId);

  const [firstQuestion, setFirstQuestion] = useState('');
  const [secondQuestion, setSecondQuestion] = useState('');
  const [formSubmitStatus, setFormSubmitStatus] = useState(REQUEST_STATUS.idle);

  const canSubmit =
    [firstQuestion, secondQuestion].every(Boolean) &&
    formSubmitStatus === REQUEST_STATUS.idle;

  const onFirstQuestionChange = (e) => {
    setFirstQuestion(e.target.value);
    setFormSubmitStatus(REQUEST_STATUS.idle);
  };

  const onSecondQuestionChange = (e) => {
    setSecondQuestion(e.target.value);
    setFormSubmitStatus(REQUEST_STATUS.idle);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (canSubmit) {
      try {
        setFormSubmitStatus(REQUEST_STATUS.loading);

        const resultAction = await dispatch(
          addQuestion({
            authorizedUser,
            optionOneText: firstQuestion,
            optionTwoText: secondQuestion,
          })
        );
        const originalPromiseResult = unwrapResult(resultAction);

        dispatch(
          addUserQuestion({
            authorizedUser,
            questionId: originalPromiseResult.id,
          })
        );

        setFormSubmitStatus(REQUEST_STATUS.idle);
        history.push('/');
      } catch (err) {
        setFormSubmitStatus(REQUEST_STATUS.failed);
        console.log(`Failed to submit the data:`, err);
      }
    }
  };

  return (
    <div className="container mw-500">
      <h2 className="text-center">Add a new question</h2>
      <form className="card" onSubmit={handleSubmit}>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title mb-3">Would you rather...</h5>
          <input
            type="text"
            className="form-control mb-2"
            id="aqf-option-one"
            placeholder="Enter first option"
            value={firstQuestion}
            onChange={onFirstQuestionChange}
          />
          <p className="text-center mb-2">or</p>
          <input
            type="text"
            className="form-control mb-3"
            id="aqf-option-two"
            placeholder="Enter second option"
            value={secondQuestion}
            onChange={onSecondQuestionChange}
          />
          <button
            type="submit"
            className="btn btn-primary my-3 px-5 align-self-center"
            disabled={!canSubmit}
          >
            Submit
          </button>
          {formSubmitStatus === REQUEST_STATUS.failed && (
            <div className="alert alert-danger py-2 mt-3" role="alert">
              Sorry, something went wrong. Please try again!
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
