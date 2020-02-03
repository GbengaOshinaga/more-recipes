import { api } from '../../utils';
import { getUserId } from './selectors';
import allRecipesOperations from './allRecipes/operations';
import mostFavoritedRecipesOperations from './mostFavoritedRecipes/operations';
import searchOperations from './search/operations';
import recipeDetailsOperations from './recipeDetails/operations';
import reviewsOperations from './reviews/operations';
import userRecipesOperations from './userRecipes/operations';
import userFavoritesOperations from './userFavorites/operations';

const userId = getUserId();

const operations = actions => ({
  ...allRecipesOperations(actions, api, userId),
  ...mostFavoritedRecipesOperations(actions, api),
  ...searchOperations(actions, api),
  ...recipeDetailsOperations(actions, api),
  ...reviewsOperations(actions, api),
  ...userRecipesOperations(actions, api),
  ...userFavoritesOperations(actions, api)
});

export default operations;
