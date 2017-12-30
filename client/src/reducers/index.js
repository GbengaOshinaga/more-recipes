import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import account from './accountReducer';
import userRecipes from './userRecipesReducer';
import userFavourites from './userFavouritesReducer';
import recipes from './recipesReducer';
import recipe from './recipeReducer';

const rootReducer = combineReducers({
  account,
  userRecipes,
  userFavourites,
  recipes,
  recipe,
  session: sessionReducer
});

export default rootReducer;
