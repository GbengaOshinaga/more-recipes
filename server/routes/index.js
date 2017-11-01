import jsend from 'jsend';
import RecipeValidator from '../validator/RecipeValidator';
import UserValidator from '../validator/UsersValidator';
import RecipesController from '../controllers/RecipesController';
import UserController from '../controllers/UserController';

const recipes = new RecipesController();

export default (app) => {
  app.use(jsend.middleware);
  app.get('/api/v1/recipes/', (req, res) => { recipes.getRecipes(req, res); });
  app.post('/api/v1/recipes/', RecipeValidator.validateRecipe, (req, res) => { recipes.addRecipe(req, res); });
  app.put('/api/v1/recipes/:id', RecipeValidator.validateID, (req, res) => { recipes.modifyRecipe(req, res); });
  app.delete('/api/v1/recipes/:id', RecipeValidator.validateID, (req, res) => { recipes.deleteRecipe(req, res); });
  app.post('/api/v1/recipes/:id/reviews', RecipeValidator.validateID, (req, res) => { recipes.addReview(req, res); });
  app.post('/api/v1/users/signup', UserValidator.validateSignUp, (req, res) => { UserController.signup(req, res); });
  app.post('/api/v1/users/signin', (req, res) => { UserController.signin(req, res); });

  // app.use((err, req, res) => {
  //   res.status(400).json(err);
  // });
};
