import * as favouriteRecipesController from '../controllers/favouriteRecipesController';
import { authenticate } from '../middlewares';

const usersRecipesBaseUrl = '/api/v1/users/recipes';

export default app => {
  app.get(
    '/api/v1/recipes/most_favourited',
    favouriteRecipesController.getMostFavourited
  );

  // Add a favourite recipe for a user
  app.post(
    `${usersRecipesBaseUrl}/:id/favourites`,
    authenticate,
    favouriteRecipesController.addFavourite
  );

  // Get all favourite recipes for a user
  app.get(
    `${usersRecipesBaseUrl}/favourites`,
    authenticate,
    favouriteRecipesController.getFavouriteRecipes
  );

  // Delete favourite recipe for a user
  app.delete(
    `${usersRecipesBaseUrl}/:id/favourites`,
    authenticate,
    favouriteRecipesController.deleteFavourite
  );
};
