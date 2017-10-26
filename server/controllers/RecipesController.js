import { Router } from 'express';
import Recipes from '../models/Recipes';

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

    this.route.get('/', (req, res) => {this.getRecipes(req, res)});
    this.route.post('/', (req, res) => {this.addRecipe(req, res)});
    this.route.put('/', (req, res) => {this.modifyRecipe(req, res)});
  }

  /**
   * Adds a recipe
   * @param {*} req 
   * @param {*} res 
   */
  addRecipe(req, res) {
    const recipe = {
      name: req.body.recipeName,
      details: req.body.recipeDetail,
      ingredients: req.body.ingredients
    };  
    return res.json(this.recipes.addRecipe(recipe));
  }

  /**
   * Gets Recipes
   * @param {*} req 
   * @param {*} res 
   */
  getRecipes(req, res) {
    console.log(req.query);
    if(req.query.sort && req.query.order){
      console.log("Entered");
      return res.json(this.recipes.getSortedRecipes());
    }
    return res.json(this.recipes.getRecipes());
  }

  /**
   * Modifies a recipe
   * @param {*} req 
   * @param {*} res 
   */
  modifyRecipe(req, res) {
    const recipe = {
      name: req.body.recipeName,
      details: req.body.recipeDetail,
      ingredients: req.body.ingredients
    };
    console.log(req.params.id);
    return res.json(this.recipes.modifyRecipe(req.params.id, recipe));
  }
}
