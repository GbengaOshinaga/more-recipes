import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import userRecipes from './userRecipesReducer';
import userFavourites from './userFavouritesReducer';
import recipes from './recipesReducer';
import searchResults from './searchReducer';

const rootReducer = combineReducers({
  userRecipes,
  userFavourites,
  recipes,
  searchResults,
  session: sessionReducer
});

export default rootReducer;
