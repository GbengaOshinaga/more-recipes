import React from 'react';
import { Route, Switch } from 'react-router';
import { sessionService } from 'redux-react-session';
import HomePage from './components/home/HomePage';
import SignIn from './components/account/SignIn';
import SignUp from './components/account/SignUp';
import UserRecipes from './components/recipes/UserRecipes';
import Profile from './components/user/Profile';
import Catalog from './components/catalog/Catalog';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/index" component={HomePage} />
    <Route path="/my_recipes" onEnter={sessionService.checkAuth} component={UserRecipes} />
    <Route path="/profile" component={Profile} />
    <Route path="/catalog" component={Catalog} />
  </Switch>
);

export default Routes;
