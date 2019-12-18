import {
  getRecipeValidation,
  getParamsValidation,
  getIdValidation,
  getReviewValidation
} from '../validator';
import * as recipesController from '../controllers/recipesController';
import * as reviewsController from '../controllers/reviewsController';
import { authenticate, paginate, errorHandler, getUser } from '../middlewares';

const baseUrl = '/api/v1/recipes';

export default app => {
  app.get(
    baseUrl,
    getUser,
    errorHandler(getParamsValidation()),
    paginate,
    recipesController.getRecipes
  );

  app.get(
    `${baseUrl}/:id`,
    errorHandler(getIdValidation()),
    recipesController.getRecipeById
  );

  // Add a recipe
  app.post(
    baseUrl,
    authenticate,
    errorHandler(getRecipeValidation()),
    recipesController.addRecipe
  );

  // Edit a recipe
  app.put(
    `${baseUrl}/:id`,
    authenticate,
    errorHandler(getIdValidation()),
    recipesController.editRecipe
  );

  // Delete a recipe
  app.delete(
    `${baseUrl}/:id`,
    authenticate,
    errorHandler(getIdValidation()),
    recipesController.deleteRecipe
  );

  // Add a review for a recipe
  app.post(
    `${baseUrl}/:id/reviews`,
    authenticate,
    errorHandler(getIdValidation()),
    errorHandler(getReviewValidation()),
    reviewsController.addReview
  );

  // Get reviews for a recipe
  app.get(
    `${baseUrl}/:id/reviews`,
    errorHandler(getIdValidation()),
    paginate,
    reviewsController.getReviews
  );

  // Edit a review
  app.put(
    `${baseUrl}/:id/reviews`,
    authenticate,
    errorHandler(getIdValidation()),
    reviewsController.editReview
  );

  // Delete a review
  app.delete(
    `${baseUrl}/:id/reviews`,
    authenticate,
    errorHandler(getIdValidation()),
    reviewsController.deleteReview
  );
};
