/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { isAuthorizedUser } from 'features/authorization/authSlice';

export const PrivateRoute = ({ children, ...rest }) => {
  console.log(`PrivateRoute`);

  const isAuth = useSelector(isAuthorizedUser);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { referrer: location } }}
          />
        )
      }
    />
  );
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};
