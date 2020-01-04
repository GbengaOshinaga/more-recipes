import * as favoriteRecipesController from '../controllers/favouriteRecipesController';
import { authenticate, getUser } from '../middlewares';

const usersRecipesBaseUrl = '/api/v1/users/recipes';

export default app => {
  app.get(
    '/api/v1/recipes/most_favorited',
    favoriteRecipesController.getMostFavourited
  );

  // Add a favourite recipe for a user
  app.post(
    `${usersRecipesBaseUrl}/:id/favorites`,
    authenticate,
    favoriteRecipesController.addFavourite
  );

  // Get all favourite recipes for a user
  app.get(
    `${usersRecipesBaseUrl}/favorites`,
    authenticate,
    favoriteRecipesController.getFavouriteRecipes
  );

  app.get(
    `${usersRecipesBaseUrl}/favoritesIds`,
    getUser,
    favoriteRecipesController.getUserFavoritesIds
  );

  // Delete favourite recipe for a user
  app.delete(
    `${usersRecipesBaseUrl}/:id/favorites`,
    authenticate,
    favoriteRecipesController.deleteFavourite
  );
};
