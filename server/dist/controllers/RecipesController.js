'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * RecipesController
 */
var RecipesController = function () {
  function RecipesController() {
    _classCallCheck(this, RecipesController);
  }

  _createClass(RecipesController, [{
    key: 'addRecipe',


    /**
     * Adds a recipe
     * @param {*} req
     * @param {*} res
     * @returns {Recipes} all recipes
     */
    value: function addRecipe(req, res) {
      var ingredientsArray = req.body.ingredients.split(',');

      _index2.default.Recipes.create({
        name: req.body.name,
        description: req.body.description,
        userId: req.user.userId,
        image: req.body.image,
        ingredients: ingredientsArray
      }).then(function (recipe) {
        return res.jsend.success(recipe);
      }).catch(function (error) {
        return res.jsend.error(error);
      });
    }

    /**
     * Gets Recipes
     * @param {*} req
     * @param {*} res
     * @returns {Recipes} all recipes
     */

  }, {
    key: 'getRecipes',
    value: function getRecipes(req, res) {
      _index2.default.Recipes.findAll().then(function (recipes) {
        return res.jsend.success(recipes);
      }).catch(function (error) {
        return res.jsend.error(error);
      });
    }

    /**
     * Gets recipe with specified id
     * @param {*} req
     * @param {*} res
     * @returns {*} res
     */

  }, {
    key: 'getRecipeById',
    value: function getRecipeById(req, res) {
      _index2.default.Recipes.findById(req.params.id).then(function (recipe) {
        if (!recipe) {
          return res.status(400).jsend.fail('Recipe with Id of ' + req.params.id + ' does not exist');
        }
        res.status(200).jsend.success(recipe);
      });
    }

    /**
     * Modifies a recipe
     * @param {*} req
     * @param {*} res
     * @returns {Recipes} Modified recipe
     */

  }, {
    key: 'modifyRecipe',
    value: function modifyRecipe(req, res) {
      var ingredientsArray = void 0;
      if (req.body.ingredients) {
        ingredientsArray = req.body.ingredients.split(',');
      }

      _index2.default.Recipes.findById(req.params.id).then(function (recipe) {
        if (!recipe) {
          return res.status(404).jsend.fail({ message: 'The Recipe does not exist' });
        }
        if (recipe.userId !== req.user.userId) {
          return res.status(401).jsend.fail('You are not authorized to edit this recipe');
        }
        recipe.update({
          name: req.body.name || recipe.name,
          description: req.body.description || recipe.description,
          userId: req.user.userId,
          image: req.body.image,
          ingredients: ingredientsArray || recipe.ingredients
        }).then(function (recipe) {
          return res.status(200).jsend.success(recipe);
        });
      }).catch(function (error) {
        return res.jsend.error(error);
      });
    }

    /**
     * Deletes specified recipe
     * @param {*} req
     * @param {*} res
     * @returns {Recipes} deleted recipe
     */

  }, {
    key: 'deleteRecipe',
    value: function deleteRecipe(req, res) {
      _index2.default.Recipes.findById(req.params.id).then(function (recipe) {
        if (recipe === null) {
          return res.status(404).jsend.fail({ message: 'The Recipe does not exist' });
        }
        recipe.destroy({ force: true }).then(function (recipe) {
          return res.jsend.success({ message: 'Recipe has been successfully deleted' });
        }).catch(function (error) {
          return res.status(400).jsend.error(error);
        });
      }).catch(function (error) {
        return res.status(400).jsend.error(error);
      });
    }

    /**
     * Add review to recipe
     * @param {*} req
     * @param {*} res
     * @returns {Recipes} recipe object
     */

  }, {
    key: 'addReview',
    value: function addReview(req, res) {
      _index2.default.Reviews.create({
        review: req.body.review,
        userId: req.user.userId,
        recipeId: req.body.recipe
      }).then(function (review) {
        return res.status(201).jsend.success(review);
      }).catch(function (error) {
        return res.status(400).jsend.error(error);
      });
    }
  }]);

  return RecipesController;
}();

exports.default = RecipesController;