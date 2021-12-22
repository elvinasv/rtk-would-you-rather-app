import React from 'react';
import { useSelector } from 'react-redux';

import { selectLeaders } from 'features/users/usersSlice';
import { LeaderItem } from './leader-item';

export function Leaderboard() {
  const leaderList = useSelector(selectLeaders);

  return (
    <div className="container mw-500">
      <h2 className="text-center">Leaderboard</h2>
      {leaderList.map((user, index) => (
        <LeaderItem key={user.id} userId={user.id} place={index + 1} />
      ))}
    </div>
  );
}
