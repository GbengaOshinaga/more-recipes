import UserController from '../controllers/UserController';
import UserValidator from '../validator/UsersValidator';
import AuthValidator from '../validator/AuthValidator';
import RecipeValidator from '../validator/RecipeValidator';

export default (app) => {
  // Sign up a user
  app.post('/api/v1/users/signup', UserValidator.validateSignUp, UserController.signup);

  // Sign in a user
  app.post('/api/v1/users/signin', UserValidator.validateSignIn, UserController.signin);

  // Edit user information
  app.post('/api/v1/users/edit', AuthValidator.authenticate, UserValidator.validateInput, UserController.modifyUser);

  // Get user by id
  app.get('/api/v1/user/:id', RecipeValidator.validateID, UserController.getUserById);

  // Delete user
  app.delete('/api/v1/user/:id', AuthValidator.authenticate, RecipeValidator.validateID, UserController.deleteUser);

  app.get('/api/v1/users/recipes', AuthValidator.authenticate, UserController.getUsersRecipes);
};
