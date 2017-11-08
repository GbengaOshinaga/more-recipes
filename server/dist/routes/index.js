'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsend = require('jsend');

var _jsend2 = _interopRequireDefault(_jsend);

var _RecipeValidator = require('../validator/RecipeValidator');

var _RecipeValidator2 = _interopRequireDefault(_RecipeValidator);

var _UsersValidator = require('../validator/UsersValidator');

var _UsersValidator2 = _interopRequireDefault(_UsersValidator);

var _AuthValidator = require('../validator/AuthValidator');

var _AuthValidator2 = _interopRequireDefault(_AuthValidator);

var _RecipesController = require('../controllers/RecipesController');

var _RecipesController2 = _interopRequireDefault(_RecipesController);

var _UserController = require('../controllers/UserController');

var _UserController2 = _interopRequireDefault(_UserController);

var _FavouriteRecipesController = require('../controllers/FavouriteRecipesController');

var _FavouriteRecipesController2 = _interopRequireDefault(_FavouriteRecipesController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var recipes = new _RecipesController2.default();
var favourites = new _FavouriteRecipesController2.default();

exports.default = function (app) {
  app.use(_jsend2.default.middleware);
  app.get('/api/v1/recipes/', function (req, res) {
    recipes.getRecipes(req, res);
  });
  app.get('/api/v1/recipes/:id', _RecipeValidator2.default.validateID, function (req, res) {
    recipes.getRecipeById(req, res);
  });
  app.post('/api/v1/recipes/', _AuthValidator2.default.authenticate, _RecipeValidator2.default.validateRecipe, function (req, res) {
    recipes.addRecipe(req, res);
  });
  app.put('/api/v1/recipes/:id', _AuthValidator2.default.authenticate, _RecipeValidator2.default.validateID, function (req, res) {
    recipes.modifyRecipe(req, res);
  });
  app.delete('/api/v1/recipes/:id', _AuthValidator2.default.authenticate, _RecipeValidator2.default.validateID, function (req, res) {
    recipes.deleteRecipe(req, res);
  });
  app.post('/api/v1/recipes/:id/reviews', _AuthValidator2.default.authenticate, _RecipeValidator2.default.validateID, function (req, res) {
    recipes.addReview(req, res);
  });
  app.post('/api/v1/users/signup', _UsersValidator2.default.validateSignUp, function (req, res) {
    _UserController2.default.signup(req, res);
  });
  app.post('/api/v1/users/signin', _UsersValidator2.default.validateSignIn, function (req, res) {
    _UserController2.default.signin(req, res);
  });
  app.post('/api/v1/users/recipes/:id', _AuthValidator2.default.authenticate, function (req, res) {
    favourites.addFavourite(req, res);
  });
  app.post('/api/v1/users/:id/recipes', _AuthValidator2.default.authenticate, function (req, res) {
    favourites.getFavourites(req, res);
  });
};