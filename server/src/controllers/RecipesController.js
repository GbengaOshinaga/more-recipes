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
      userId: req.user.userId,
      image: req.body.image,
      ingredients: ingredientsArray
    })
      .then(recipe => res.jsend.success(recipe))
      .catch(error => res.jsend.error(error));
  }

  /**
   * Gets Recipes
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} all recipes
   */
  getRecipes(req, res) {
    db.Recipes.findAll()
      .then(recipes => res.jsend.success(recipes))
      .catch(error => res.jsend.error(error));
  }

  /**
   * Gets recipe with specified id
   * @param {*} req
   * @param {*} res
   * @returns {*} res
   */
  getRecipeById(req, res) {
    db.Recipes.findById(req.params.id)
      .then(recipe => {
        if (!recipe) {
          return res.status(400).jsend.fail(`Recipe with Id of ${req.params.id} does not exist`);
        }
        res.status(200).jsend.success(recipe);
      })
  }

  /**
   * Modifies a recipe
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} Modified recipe
   */
  modifyRecipe(req, res) {
    const ingredientsArray = req.body.ingredients.split(',');
    db.Recipes.findById(req.params.id)
      .then(recipe => {
        if (!recipe) {
          return res.status(404).jsend.fail({ message: 'The Recipe does not exist' });
        }
        if (recipe.userId !== req.user.userId){
          return res.status(401).jsend.fail('You are not authorized to edit this recipe');
        }
        recipe.update({
          name: req.body.name,
          description: req.body.description,
          userId: req.body.user,
          image: req.body.image,
          ingredients: ingredientsArray
        }).then(recipe => res.status(200).jsend.success(recipe));
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
      .then(recipe => {
        if(recipe === null) {
          return res.status(404).jsend.fail({ message: 'The Id does not exist' });
        }
        recipe.destroy({ force: true })
          .then(res.status(200).jsend.success({ message: 'Recipe has been successfully deleted'}))
          .catch(error => res.status(400).jsend.error(error));
      })
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
      userId: req.body.user,
      recipeId: req.body.recipe
    })
      .then(review => res.status(201).jsend.success({message: 'Review added successfully'}))
      .catch(error => res.status(400).jsend.error(error));
  }
}