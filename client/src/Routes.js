import React, { lazy } from 'react';
import { Route, Switch } from 'react-router';
import HomePage from './components/home/HomePage';
import SignOut from './components/auth/SignOut';
import RecipeDetails from './components/recipeDetails/RecipeDetails';
import PrivateRoute from './PrivateRoute';
import NotFound from './components/404Page';
import SuspenseWrapper from './components/common/SuspenseWrapper';

const SignIn = lazy(() => import('./components/auth/SignIn'));
const SignUp = lazy(() => import('./components/auth/SignUp'));
const UserRecipes = lazy(() => import('./components/user/UserRecipes'));
const Profile = lazy(() => import('./components/user/Profile'));
const Catalog = lazy(() => import('./components/catalog/Catalog'));
const FavoriteRecipes = lazy(() =>
  import('./components/user/FavouriteRecipes')
);

const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route path="/signin" component={SuspenseWrapper(SignIn)} />
    <Route path="/signup" component={SuspenseWrapper(SignUp)} />
    <Route path="/index" component={HomePage} />
    <PrivateRoute path="/my_recipes" component={SuspenseWrapper(UserRecipes)} />
    <PrivateRoute path="/profile" component={SuspenseWrapper(Profile)} />
    <Route path="/catalog" component={SuspenseWrapper(Catalog)} />
    <PrivateRoute
      path="/favourites"
      component={SuspenseWrapper(FavoriteRecipes)}
    />
    <Route path="/recipe/:id" component={RecipeDetails} />
    <Route path="/logout" component={SignOut} />
    <Route path="/*" component={NotFound} />
  </Switch>
);

export default Routes;
