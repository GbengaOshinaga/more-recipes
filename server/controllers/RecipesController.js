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
  }

  /**
   * Adds a recipe
   * @param {*} req 
   * @param {*} res 
   */
  addRecipe(req, res) {
    this.route.post('/api/recipes', (req, res) => {
        
    });
  }

  /**
   * Gets Recipes
   * @param {*} req 
   * @param {*} res 
   */
  getRecipes(req, res) {
      this.route.get('/api/recipes', (req, res) => {
        return res.json(this.recipes.getRecipes());
      });
  }
}
