import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import account from './accountReducer';
import userRecipes from './userRecipesReducer';
import userFavourites from './userFavouritesReducer';
import recipes from './recipesReducer';
import recipe from './recipeReducer';
import searchResults from './searchReducer';

const rootReducer = combineReducers({
  account,
  userRecipes,
  userFavourites,
  recipes,
  recipe,
  searchResults,
  session: sessionReducer
});

export default rootReducer;
