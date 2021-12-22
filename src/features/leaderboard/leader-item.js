import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import {
  selectUserById,
  selectAnsweredCountByUser,
  selectAskedCountByUser,
} from 'features/users/usersSlice';
import { Avatar } from 'features/question/avatar';

const HIGHLIGHT_TOP_PLACES = 3;
export function LeaderItem({ userId, place }) {
  const { name } = useSelector((state) => selectUserById(state, userId));
  const answeredScore = useSelector((state) =>
    selectAnsweredCountByUser(state, userId)
  );
  const askedScore = useSelector((state) =>
    selectAskedCountByUser(state, userId)
  );

  return (
    <div className="card mb-3 border">
      <div className="row g-0">
        <div className="col-3 d-flex flex-column align-items-center p-2 p-sm-3">
          <Avatar className="rounded-circle" />
        </div>
        <div className="col-5 p-2 text-start">
          <h5>{name}</h5>
          <hr />
          <p>{`Answered questions: ${answeredScore}`}</p>
          <p className="m-0">{`Created questions: ${askedScore}`}</p>
        </div>
        <div className="col-4 p-2 text-center">
          <div className="card">
            <div className="card-header">Score</div>
            <div className="card-body">
              <h5 className="m-2">{answeredScore + askedScore}</h5>
            </div>
          </div>
        </div>
      </div>
      {HIGHLIGHT_TOP_PLACES >= place && (
        <span
          className={classNames(
            'position-absolute end-0 badge badge w-auto x-2 fs-6',
            place === 1 ? `bg-warning text-dark` : 'bg-secondary'
          )}
        >
          {place}
        </span>
      )}
    </div>
  );
}

LeaderItem.propTypes = {
  userId: PropTypes.string,
  place: PropTypes.number,
};
