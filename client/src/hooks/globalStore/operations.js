import allRecipesOperations from './allRecipes/operations';
import mostFavoritedRecipesOperations from './mostFavoritedRecipes/operations';
import searchOperations from './search/operations';
import recipeDetailsOperations from './recipeDetails/operations';
import reviewsOperations from './reviews/operations';
import userRecipesOperations from './userRecipes/operations';
import userFavoritesOperations from './userFavorites/operations';

const operations = actions => ({
  ...allRecipesOperations(actions),
  ...mostFavoritedRecipesOperations(actions),
  ...searchOperations(actions),
  ...recipeDetailsOperations(actions),
  ...reviewsOperations(actions),
  ...userRecipesOperations(actions),
  ...userFavoritesOperations(actions)
});

export default operations;
