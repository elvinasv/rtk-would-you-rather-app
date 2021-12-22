import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AvatarImg from 'assets/avatar_3.svg';

export function Avatar({ src = AvatarImg, className: passedClassName }) {
  return (
    <img
      src={src}
      className={classNames(
        'img-fluid shadow-sm border border-light',
        passedClassName
      )}
      alt="..."
    />
  );
}

Avatar.propTypes = {
  src: PropTypes.string,
  className: PropTypes.string,
};
