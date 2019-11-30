import FavouriteRecipesController from '../controllers/FavouriteRecipesController';
import { authenticate } from '../middlewares/authenticate';

export default (app) => {
  app.get('/api/v1/recipes/most_favourited', FavouriteRecipesController.getMostFavourited);

  // Add a favourite recipe for a user
  app.post('/api/v1/users/recipes/:id/favourites', authenticate, FavouriteRecipesController.addFavourite);

  // Get all favourite recipes for a user
  app.get('/api/v1/users/recipes/favourites', authenticate, FavouriteRecipesController.getFavourites);

  // Delete favourite recipe for a user
  app.delete('/api/v1/users/recipes/:id/favourites', authenticate, FavouriteRecipesController.deleteFavourites);
};
