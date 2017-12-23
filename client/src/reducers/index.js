import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import account from './accountReducer';
import userRecipes from './userRecipesReducer';

const rootReducer = combineReducers({
  account,
  session: sessionReducer,
  userRecipes
});

export default rootReducer;
