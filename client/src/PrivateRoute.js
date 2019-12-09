/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
import { Redirect } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import Preloader from './components/common/Preloader';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    async function setAuthenticatedState() {
      try {
        await sessionService.loadSession();
        setAuthenticated(true);
        setLoading(false);
      } catch (e) {
        setLoading(false);
      }
    }

    setAuthenticatedState();
  }, []);

  if (loading) {
    return <Preloader />;
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
