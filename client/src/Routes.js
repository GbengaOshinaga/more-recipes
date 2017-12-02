import React from 'react';
import { Route, Switch } from 'react-router';
import HomePage from './components/home/HomePage';
import SignIn from './components/account/SignIn';
import SignUp from './components/account/SignUp';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Switch>
);

export default Routes;
