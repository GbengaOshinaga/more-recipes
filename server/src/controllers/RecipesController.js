import db from '../models/index';

/**
 * RecipesController
 */
export default class RecipesController {
  /**
   * Adds a recipe
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} all recipes
   */
  addRecipe(req, res) {
    const ingredientsArray = req.body.ingredients.split(',');

    db.Recipes.create({
      name: req.body.name,
      description: req.body.description,
      UserId: req.user.userId,
      image: req.body.image,
      ingredients: ingredientsArray
    })
      .then(recipe => res.status(201).jsend.success(recipe))
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
   * Gets Recipes
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} all recipes
   */
  getRecipes(req, res) {
    db.Recipes.findAll({
      include: [{
        model: db.Reviews,
      }]
    })
      .then(recipes => res.jsend.success(recipes))
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
   * Gets recipe with specified id
   * @param {*} req
   * @param {*} res
   * @returns {*} res
   */
  getRecipeById(req, res) {
    db.Recipes.findById(req.params.id, { include: [{ model: db.Reviews }] })
      .then((recipe) => {
        if (!recipe) {
          return res.status(400).jsend.fail({ message: `Recipe with Id of ${req.params.id} does not exist` });
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
  modifyRecipe(req, res) {
    let ingredientsArray;
    if (req.body.ingredients) {
      ingredientsArray = req.body.ingredients.split(',');
    }

    db.Recipes.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).jsend.fail({ message: 'The Recipe does not exist' });
        }
        if (recipe.UserId !== req.user.userId) {
          return res.status(401).jsend.fail({ message: 'You are not authorized to edit this recipe' });
        }
        recipe.update({
          name: req.body.name || recipe.name,
          description: req.body.description || recipe.description,
          userId: req.user.userId,
          image: req.body.image || recipe.image,
          ingredients: ingredientsArray || recipe.ingredients
        }).then(updatedRecipe => res.status(200).jsend.success(updatedRecipe));
      })
      .catch(error => res.jsend.error(error));
  }

  /**
   * Deletes specified recipe
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} deleted recipe
   */
  deleteRecipe(req, res) {
    db.Recipes.findById(req.params.id)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).jsend.fail({ message: 'The Recipe does not exist' });
        }
        if (recipe.UserId !== req.user.userId) {
          return res.status(401).jsend.fail({ message: 'You are not authorized to delete this recipe' });
        }
        recipe.destroy({ force: true })
          .then(recipe => res.jsend.success({ message: 'Recipe has been successfully deleted' }))
          .catch(error => res.status(400).jsend.error(error));
      })
      .catch(error => res.status(400).jsend.error(error));
  }

  /**
   * Add review to recipe
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} recipe object
   */
  addReview(req, res) {
    db.Reviews.create({
      review: req.body.review,
      UserId: req.user.userId,
      recipeId: req.params.id,
      RecipeId: req.params.id
    })
      .then(review => res.status(201).jsend.success(review))
      .catch(error => res.status(400).jsend.error(error));
  }
}
