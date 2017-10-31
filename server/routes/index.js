import validate from 'express-validation';
import validateRecipe from '../validator/validateRecipe';
import RecipesController from '../controllers/RecipesController';
import UserController from '../controllers/UserController';

const recipes = new RecipesController();

export default (app) => {
  app.get('/api/v1/recipes/', (req, res) => { recipes.getRecipes(req, res); });
  app.post('/api/v1/recipes/', validate(validateRecipe), (req, res) => { recipes.addRecipe(req, res); });
  app.put('/api/v1/recipes/:id', (req, res) => { recipes.modifyRecipe(req, res); });
  app.delete('/api/v1/recipes/:id', (req, res) => { recipes.deleteRecipe(req, res); });
  app.post('/api/v1/recipes/:id/reviews', (req, res) => { recipes.addReview(req, res); });
  app.post('/api/v1/users/signup', (req, res) => { UserController.signup(req, res); });

  // app.use((err, req, res) => {
  //   res.status(400).json(err);
  // });
};
