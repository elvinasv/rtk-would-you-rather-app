import React from 'react';

import { LeaderItem } from './leader-item';

export function Leaderboard() {
  return (
    <div className="container mw-500">
      <h2 className="text-center">Leaderboard</h2>
      <LeaderItem />
      <LeaderItem />
    </div>
  );
}
