import { combineReducers } from 'redux';
import allRecipes, {
  initialState as recipesInitialState
} from './allRecipes/reducers';
import mostFavoritedRecipes, {
  initialState as mostFavoritedInitialState
} from './mostFavoritedRecipes/reducers';

export default combineReducers({ allRecipes, mostFavoritedRecipes });

export const initialState = {
  allRecipes: recipesInitialState,
  mostFavoritedRecipes: mostFavoritedInitialState
};
