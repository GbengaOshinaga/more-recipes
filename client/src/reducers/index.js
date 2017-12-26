import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import account from './accountReducer';
import userRecipes from './userRecipesReducer';
import recipes from './recipesReducer';
import recipe from './recipeReducer';

const rootReducer = combineReducers({
  account,
  session: sessionReducer,
  userRecipes,
  recipes,
  recipe
});

export default rootReducer;
