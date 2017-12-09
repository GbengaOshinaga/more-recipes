import React from 'react';
import { Route, Switch } from 'react-router';
import { sessionService } from 'redux-react-session';
import HomePage from './components/home/HomePage';
import SignIn from './components/account/SignIn';
import SignUp from './components/account/SignUp';
import UserRecipes from './components/user/UserRecipes';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/catalog" component={HomePage} />
    <Route path="/my_recipes" onEnter={sessionService.checkAuth} component={UserRecipes} />
  </Switch>
);

export default Routes;
