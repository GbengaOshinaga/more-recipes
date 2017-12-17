import jsend from 'jsend';
import RecipeValidator from '../validator/RecipeValidator';
import UserValidator from '../validator/UsersValidator';
import AuthValidator from '../validator/AuthValidator';
import RecipesController from '../controllers/RecipesController';
import UserController from '../controllers/UserController';
import FavouriteRecipesController from '../controllers/FavouriteRecipesController';
import VotesController from '../controllers/VotesController';

const recipes = new RecipesController();
const favourites = new FavouriteRecipesController();

export default (app) => {
  app.use(jsend.middleware);

  // Get all recipes
  app.get('/api/v1/recipes/', RecipeValidator.validateQueryParams, (req, res) => { recipes.getRecipes(req, res); });

  // Get recipe by ID
  app.get('/api/v1/recipes/:id', RecipeValidator.validateID, (req, res) => { recipes.getRecipeById(req, res); });

  // Add a recipe
  app.post('/api/v1/recipes/', AuthValidator.authenticate, RecipeValidator.validateRecipe, (req, res) => { recipes.addRecipe(req, res); });

  // Edit a recipe
  app.put('/api/v1/recipes/:id', AuthValidator.authenticate, RecipeValidator.validateID, RecipeValidator.validateInput, (req, res) => { recipes.modifyRecipe(req, res); });

  // Delete a recipe
  app.delete('/api/v1/recipes/:id', AuthValidator.authenticate, RecipeValidator.validateID, (req, res) => { recipes.deleteRecipe(req, res); });

  // Add a review for a recipe
  app.post('/api/v1/recipes/:id/reviews', AuthValidator.authenticate, RecipeValidator.validateID, (req, res) => { recipes.addReview(req, res); });

  // Sign up a user
  app.post('/api/v1/users/signup', UserValidator.validateSignUp, (req, res) => { UserController.signup(req, res); });

  // Sign in a user
  app.post('/api/v1/users/signin', UserValidator.validateSignIn, (req, res) => { UserController.signin(req, res); });

  // Edit user information
  app.post('/api/v1/users/edit', AuthValidator.authenticate, UserValidator.validateInput, (req, res) => { UserController.modifyUser(req, res); });

  // Add a favourite recipe for a user
  app.post('/api/v1/users/recipes/:id/favourites', AuthValidator.authenticate, (req, res) => { favourites.addFavourite(req, res); });

  // Get all favourite recipes for a user
  app.get('/api/v1/users/recipes/favourites', AuthValidator.authenticate, (req, res) => { favourites.getFavourites(req, res); });

  // Delete favourite recipe for a user
  app.delete('/api/v1/users/recipes/:id/favourites', AuthValidator.authenticate, (req, res) => { favourites.deleteFavourites(req, res); })

  // Get all recipes created by user
  app.get('/api/v1/users/recipes', AuthValidator.authenticate, (req, res) => { UserController.getUsersRecipes(req, res); });

  // Add upvote for recipe
  app.post('/api/v1/recipes/upvote/:id', AuthValidator.authenticate, (req, res) => { VotesController.addUpvote(req, res); });

  // Add downvote for recipe
  app.post('/api/v1/recipes/downvote/:id', AuthValidator.authenticate, (req, res) => { VotesController.addDownvote(req, res); });
};
