import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import css from './answered-question-option.module.scss';

export function AnsweredQuestionOption({
  optionText,
  voteCount,
  votePercentage,
  totalVotes,
  isHighlighted,
  isUserChoice,
}) {
  return (
    <div
      className={classNames(
        'card mb-3',
        isHighlighted && 'border-success bg-opacity-10 bg-success'
      )}
    >
      <div
        className={classNames(
          'card-body d-flex flex-column',
          isHighlighted && 'text-success'
        )}
      >
        {isUserChoice && (
          <span className="badge bg-warning mb-2 align-self-end">
            Your choice
          </span>
        )}
        <div className="card-title">{`Would you rather ${optionText}`}</div>
        <div className={`progress mb-2 ${css.progress}`}>
          <div
            className={classNames(
              'progress-bar',
              isHighlighted ? 'bg-success' : 'bg-secondary'
            )}
            style={{ width: votePercentage }}
          >
            {votePercentage}
          </div>
        </div>
        <p className="card-text text-center">{`${voteCount} out of ${totalVotes} votes`}</p>
      </div>
    </div>
  );
}

AnsweredQuestionOption.propTypes = {
  optionText: PropTypes.string,
  voteCount: PropTypes.number,
  votePercentage: PropTypes.string,
  totalVotes: PropTypes.number,
  isHighlighted: PropTypes.bool,
  isUserChoice: PropTypes.bool,
};
