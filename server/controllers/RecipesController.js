import { Router } from 'express';
import Recipes from '../models/Recipes';
import RecipesValidator from '../validator/RecipeValidator';

/**
 * RecipesController
 */
export default class RecipesController {
  /**
     * Constructor
     */
  constructor() {
    this.route = Router();
    this.recipes = new Recipes();

    this.route.get('/', (req, res) => { this.getRecipes(req, res); });
    this.route.post('/', (req, res) => { this.addRecipe(req, res); });
    this.route.put('/:id', (req, res) => { this.modifyRecipe(req, res); });
    this.route.delete('/:id', (req, res) => { this.deleteRecipe(req, res); });
    this.route.post('/:id/reviews', (req, res) => { this.addReview(req, res); });
  }

  /**
   * Adds a recipe
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} all recipes
   */
  addRecipe(req, res) {
    const errors = RecipesValidator.isRecipeValid(req.body);
    if (errors.length >= 1) {
      return res.status(400).json(errors);
    }
    const recipe = {
      name: req.body.recipeName,
      details: req.body.recipeDetail,
      ingredients: req.body.ingredients
    };
    return res.status(201).json(this.recipes.addRecipe(recipe));
  }

  /**
   * Gets Recipes
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} all recipes
   */
  getRecipes(req, res) {
    if (req.query.sort && req.query.order) {
      const errors = RecipesValidator.areParamsValid(req.query.sort, req.query.order);
      if (errors.length >= 1) {
        return res.status(400).json(errors);
      }
      return res.status(200).json(this.recipes.getSortedRecipes(req.query.order));
    }
    return res.status(200).json(this.recipes.recipes);
  }

  /**
   * Modifies a recipe
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} Modified recipe
   */
  modifyRecipe(req, res) {
    const errors = RecipesValidator.isRecipeValid(req.body);
    if (errors.length >= 1) {
      return res.status(400).json(errors);
    }
    const recipe = {
      name: req.body.recipeName,
      details: req.body.recipeDetail,
      ingredients: req.body.ingredients
    };
    return res.status(200).json(this.recipes.modifyRecipe(req.params.id, recipe));
  }

  /**
   * Deletes specified recipe
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} deleted recipe
   */
  deleteRecipe(req, res) {
    const errors = RecipesValidator.isIDValid(req.params.id);
    if (errors.length >= 1) {
      return res.status(404).json(errors);
    }
    return res.status(200).json(this.recipes.deleteRecipe(req.params.id));
  }

  /**
   * Add review to recipe
   * @param {*} req
   * @param {*} res
   * @returns {Recipes} recipe object
   */
  addReview(req, res) {
    const errors = RecipesValidator.isIDValid(req.params.id);
    if (errors.length >= 1) {
      return res.status(400).json(errors);
    }
    return res.status(201).json(this.recipes.addReview(req.params.id, req.body.review));
  }
}
