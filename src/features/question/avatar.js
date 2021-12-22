import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export function Avatar({
  src = 'images/avatar_bw.svg',
  className: passedClassName,
}) {
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
