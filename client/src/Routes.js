import React from 'react';
import { Route, Switch } from 'react-router';
import HomePage from './components/home/HomePage';
import SignIn from './components/account/SignIn';
import SignUp from './components/account/SignUp';
import SignOut from './components/account/SignOut';
import UserRecipes from './components/recipes/UserRecipes';
import Profile from './components/user/Profile';
import Catalog from './components/catalog/Catalog';
import RecipeDetails from './components/recipes/RecipeDetails';
import FavouriteRecipes from './components/recipes/FavouriteRecipes';
import PrivateRoute from './PrivateRoute';


const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/index" component={HomePage} />
    <PrivateRoute path="/my_recipes" component={UserRecipes} />
    <PrivateRoute path="/profile" component={Profile} />
    <Route path="/catalog" component={Catalog} />
    <PrivateRoute path="/favourites" component={FavouriteRecipes} />
    <Route path="/recipe/:id" component={RecipeDetails} />
    <Route path="/logout" component={SignOut} />
  </Switch>
);

export default Routes;
