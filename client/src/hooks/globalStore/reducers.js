import { combineReducers } from 'redux';
import allRecipes, {
  initialState as recipesInitialState
} from './allRecipes/reducers';
import mostFavoritedRecipes, {
  initialState as mostFavoritedInitialState
} from './mostFavoritedRecipes/reducers';
import search, { initialState as searchInitialState } from './search/reducers';
import recipeDetails, {
  initialState as recipeDetailsInitialState
} from './recipeDetails/reducers';
import reviews, {
  initialState as reviewsInitialState
} from './reviews/reducers';

export default combineReducers({
  allRecipes,
  mostFavoritedRecipes,
  search,
  recipeDetails,
  reviews
});

export const initialState = {
  allRecipes: recipesInitialState,
  mostFavoritedRecipes: mostFavoritedInitialState,
  search: searchInitialState,
  recipeDetails: recipeDetailsInitialState,
  reviews: reviewsInitialState
};
