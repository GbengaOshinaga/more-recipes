import allRecipesOperations from './allRecipes/operations';
import mostFavoritedRecipesOperations from './mostFavoritedRecipes/operations';
import searchOperations from './search/operations';

const operations = actions => ({
  ...allRecipesOperations(actions),
  ...mostFavoritedRecipesOperations(actions),
  ...searchOperations(actions)
});

export default operations;
