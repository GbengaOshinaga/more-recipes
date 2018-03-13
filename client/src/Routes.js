import React from 'react';
import { Route, Switch } from 'react-router';
import HomePage from './components/home/HomePage';
import SignIn from './components/account/SignIn';
import SignUp from './components/account/SignUp';
import SignOut from './components/account/SignOut';
import UserRecipes from './components/recipes/UserRecipes';
import Profile from './components/user/Profile';
import CatalogComp from './components/catalog/Catalog';
import RecipeDetailsComp from './components/recipes/RecipeDetails';
import FavouriteRecipesComp from './components/recipes/FavouriteRecipes';
import PrivateRoute from './PrivateRoute';
import NotFound from './components/404Page';


const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
    <Route path="/index" component={HomePage} />
    <PrivateRoute path="/my_recipes" component={UserRecipes} />
    <PrivateRoute path="/profile" component={Profile} />
    <Route path="/catalog" component={CatalogComp} />
    <PrivateRoute path="/favourites" component={FavouriteRecipesComp} />
    <Route path="/recipe/:id" component={RecipeDetailsComp} />
    <Route path="/logout" component={SignOut} />
    <Route path="/*" component={NotFound} />
  </Switch>
);

export default Routes;
