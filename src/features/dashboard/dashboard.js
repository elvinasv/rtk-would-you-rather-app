import React from 'react';

import css from './dashboard.module.scss';

export default function Dashboard() {
  return (
    <div className="container mw-500">
      <h2 className="text-center mb-3">Would you rather...</h2>
      <div className={css.questions}>
        <ul className="nav nav-tabs mb-3 nav-justified">
          <li className="nav-item">
            <a className="nav-link active" href="/">
              Answered Polls
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/#unanswered">
              Unanswered Polls
            </a>
          </li>
        </ul>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sit,
          laborum odit atque ab quod illo. Voluptatem magnam minima mollitia
          dolorem voluptas accusantium autem, dicta neque ratione optio sint
          nobis. Ratione consectetur sit dolorum aliquid quidem voluptatem
          exercitationem. Quam deleniti, facilis, temporibus iste illo
          consequatur ex vero delectus dolor, eveniet error commodi nam ducimus
          neque! Quia ipsum soluta vitae esse! Quam blanditiis, doloremque vel
          natus aliquam pariatur ducimus, culpa, deserunt veritatis doloribus
          unde aut quod similique fugit qui dolor minima? Ratione pariatur
          corporis sequi, porro libero sunt facilis animi nostrum?
        </p>
      </div>
    </div>
  );
}
