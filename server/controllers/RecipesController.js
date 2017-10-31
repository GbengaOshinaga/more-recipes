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
    let ingredients = [];
    for(let i in ingredientsArray){
      ingredients.push({ ingredient: ingredientsArray[i] });
    }
    db.Recipes.create({
      name: req.body.recipeName,
      description: req.body.recipeDescription,
      image: req.body.image,
      ingredients: ingredientsArray
    }, {
      include: [db.Recipes.Ingredients]
    })
    .then(recipe => res.status(201).json(recipe))
    .catch(error => res.send(400).json(error));
  }

  /**
   * Gets Recipes
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} all recipes
   */
  getRecipes(req, res) {
  }

  /**
   * Modifies a recipe
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} Modified recipe
   */
  modifyRecipe(req, res) {
  }

  /**
   * Deletes specified recipe
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} deleted recipe
   */
  deleteRecipe(req, res) {
  }

  /**
   * Add review to recipe
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} recipe object
   */
  addReview(req, res) {
  }
}
