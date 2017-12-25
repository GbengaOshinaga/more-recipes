import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import account from './accountReducer';
import userRecipes from './userRecipesReducer';
import recipes from './recipesReducer';

const rootReducer = combineReducers({
  account,
  session: sessionReducer,
  userRecipes,
  recipes
});

export default rootReducer;
