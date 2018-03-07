import RecipeValidator from '../validator/RecipeValidator';
import RecipesController from '../controllers/RecipesController';
import AuthValidator from '../validator/AuthValidator';
import Pagination from '../middlewares/pagination';

export default (app) => {
  app.get('/api/v1/recipes/', RecipeValidator.validateQueryParams, Pagination.paginate, (req, res) => { RecipesController.getRecipes(req, res); });

  app.get('/api/v1/recipes/:id', RecipeValidator.validateID, RecipesController.getRecipeById);

  // Add a recipe
  app.post('/api/v1/recipes/', AuthValidator.authenticate, RecipeValidator.validateRecipe, RecipesController.addRecipe);

  // Edit a recipe
  app.put('/api/v1/recipes/:id', AuthValidator.authenticate, RecipeValidator.validateID, RecipesController.modifyRecipe);

  // Delete a recipe
  app.delete('/api/v1/recipes/:id', AuthValidator.authenticate, RecipeValidator.validateID, RecipesController.deleteRecipe);

  // Add a review for a recipe
  app.post('/api/v1/recipes/:id/reviews', AuthValidator.authenticate, RecipeValidator.validateID, RecipeValidator.validateReview, RecipesController.addReview);

  // Get reviews for a recipe
  app.get('/api/v1/recipes/:id/reviews', RecipeValidator.validateID, Pagination.paginate, RecipesController.getRecipeReviews);

  // Edit a review
  app.put('/api/v1/recipes/reviews/:id', AuthValidator.authenticate, RecipeValidator.validateID, RecipesController.editReview);

  // Delete a review
  app.delete('/api/v1/recipes/reviews/:id', AuthValidator.authenticate, RecipeValidator.validateID, RecipesController.deleteReview);
};
