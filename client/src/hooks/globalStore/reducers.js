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

export default combineReducers({
  allRecipes,
  mostFavoritedRecipes,
  search,
  recipeDetails
});

export const initialState = {
  allRecipes: recipesInitialState,
  mostFavoritedRecipes: mostFavoritedInitialState,
  search: searchInitialState,
  recipeDetails: recipeDetailsInitialState
};
