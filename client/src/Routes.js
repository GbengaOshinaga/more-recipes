import React from 'react';
import { Route, Switch } from 'react-router';
import SignIn from './components/account/SignIn';

const Routes = () => (
  <Switch>
    <Route path="/signin" component={SignIn} />
  </Switch>
);

export default Routes;
