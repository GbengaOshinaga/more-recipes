/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { getIsUserAuthenticated } from './hooks/globalStore';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function setAuthenticatedState() {
      try {
        setAuthenticated(getIsUserAuthenticated());
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }

    setAuthenticatedState();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (authenticated) {
    return <Route {...rest} render={props => <Component {...props} />} />;
  }

  return (
    <Route
      render={props => (
        <Redirect
          to={{
            pathname: '/signin',
            state: { from: props.location.pathname }
          }}
        />
      )}
    />
  );
};

export default PrivateRoute;
