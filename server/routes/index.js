import jsend from 'jsend';
import RecipeValidator from '../validator/RecipeValidator';
import UserValidator from '../validator/UsersValidator';
import AuthValidator from '../validator/AuthValidator';
import RecipesController from '../controllers/RecipesController';
import UserController from '../controllers/UserController';
import FavouriteRecipesController from '../controllers/FavouriteRecipesController';

const recipes = new RecipesController();
const favourites = new FavouriteRecipesController();

export default (app) => {
  app.use(jsend.middleware);
  app.get('/api/v1/recipes/', (req, res) => { recipes.getRecipes(req, res); });
  app.get('/api/v1/recipes/:id', RecipeValidator.validateID, (req, res) => { recipes.getRecipeById(req, res); });
  app.post('/api/v1/recipes/', RecipeValidator.validateRecipe, AuthValidator.authenticate, (req, res) => { recipes.addRecipe(req, res); });
  app.put('/api/v1/recipes/:id', RecipeValidator.validateID, AuthValidator.authenticate, (req, res) => { recipes.modifyRecipe(req, res); });
  app.delete('/api/v1/recipes/:id', RecipeValidator.validateID, AuthValidator.authenticate, (req, res) => { recipes.deleteRecipe(req, res); });
  app.post('/api/v1/recipes/:id/reviews', RecipeValidator.validateID, AuthValidator.authenticate, (req, res) => { recipes.addReview(req, res); });
  app.post('/api/v1/users/signup', UserValidator.validateSignUp, (req, res) => { UserController.signup(req, res); });
  app.post('/api/v1/users/signin', (req, res) => { UserController.signin(req, res); });
  app.get('/api/v1/users/:id/recipes', (req, res) => { favourites.getFavourites(req, res); });
  app.post('/api/v1/users/recipes/:id', AuthValidator.authenticate, (req, res) => { favourites.addFavourite(req, res); });
};
