import * as userController from '../controllers/userController';
import { authenticate, errorHandler } from '../middlewares';
import {
  getIdValidation,
  getSignUpValidation,
  getEmailAndPasswordValidation,
  getUpdateValidation
} from '../validator';

const baseUrl = '/api/v1/users';

export default app => {
  // Sign up a user
  app.post(
    `${baseUrl}/signup`,
    errorHandler(getSignUpValidation()),
    userController.signUp
  );

  // Sign in a user
  app.post(
    `${baseUrl}/signin`,
    errorHandler(getEmailAndPasswordValidation()),
    userController.signIn
  );

  // Edit user information
  app.post(
    `${baseUrl}/edit`,
    authenticate,
    errorHandler(getUpdateValidation()),
    userController.editUser
  );

  app.get(`${baseUrl}/recipes`, authenticate, userController.getUserRecipes);

  // Get user by id
  app.get(
    `${baseUrl}/:id`,
    errorHandler(getIdValidation()),
    userController.getUserById
  );

  // Delete user
  app.delete(
    `${baseUrl}/:id`,
    authenticate,
    errorHandler(getIdValidation()),
    userController.deleteUser
  );
};
