import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import userRecipes from './userRecipesReducer';
import userFavourites from './userFavouritesReducer';
import recipes from './recipesReducer';
import searchResults from './searchReducer';
import mostFavourited from './mostFavouritedReducer';
import paginationMeta from './paginationReducer';
import reviewsPaginationMeta from './reviewsPaginationReducer';

const rootReducer = combineReducers({
  userRecipes,
  userFavourites,
  recipes,
  paginationMeta,
  reviewsPaginationMeta,
  searchResults,
  mostFavourited,
  session: sessionReducer
});

export default rootReducer;