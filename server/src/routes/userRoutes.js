import * as userController from '../controllers/userController';
import * as userValidator from '../validator/usersValidator';
import errorHandler from '../middlewares/errorHandler';
import { authenticate } from '../middlewares/authenticate';
import { getIdValidation } from '../validator/idValidator';

const {
  getSignUpValidation,
  getEmailAndPasswordValidation,
  getUpdateValidation
} = userValidator;

const baseUrl = '/api/v1/users';

export default (app) => {
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
    userController.modifyUser
  );

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

  app.get(
    `${baseUrl}/recipes`,
    authenticate,
    userController.getUserRecipes
  );
};
