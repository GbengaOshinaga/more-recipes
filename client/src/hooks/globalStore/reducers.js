import { combineReducers } from 'redux';
import allRecipes, {
  initialState as recipesInitialState
} from './allRecipes/reducers';
import mostFavoritedRecipes, {
  initialState as mostFavoritedInitialState
} from './mostFavoritedRecipes/reducers';
import search, { initialState as searchInitialState } from './search/reducers';

export default combineReducers({ allRecipes, mostFavoritedRecipes, search });

export const initialState = {
  allRecipes: recipesInitialState,
  mostFavoritedRecipes: mostFavoritedInitialState,
  search: searchInitialState
};
