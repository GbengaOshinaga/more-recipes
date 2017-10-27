import Recipes from '../models/Recipes';

/**
 * Class for validating inputs
 */
export default class RecipeValidator {
  /**
     * Checks if recipe is valid
     * @param {*} recipe
     * @returns {Array} errors
     */
  static isRecipeValid(recipe) {
    const errors = [];
    if (!(recipe.recipeName && recipe.recipeDetail && recipe.ingredients)) {
      errors.push('Recipe Name, Description and Ingredients are required');
    }
    return errors;
  }

  /**
     * Checks if params are valid
     * @param {*} sort
     * @param {*} order
     * @returns {Array} errors
     */
  static areParamsValid(sort, order) {
    const errors = [];
    if (sort !== 'upvotes') {
      errors.push(`sort parameter must be upvotes, instead found ${sort}`);
    }

    if (order !== 'asc' && order !== 'des') {
      errors.push(`Invalid order parameter, must be "asc" or "des", instead found ${order}`);
    }
    return errors;
  }

  /**
     * Checks if id is valid
     * @param {*} id
     * @returns {Array} errors
     */
  static isIDValid(id) {
    const errors = [];
    if (Number(id) <= 0) {
      errors.push('Id cannot be 0 or a negative value');
    }
    const recipes = new Recipes();
    const ids = recipes.getRecipesIDs();
    let isFound;
    for (let i = 0; i < ids.length; i++) {
      if (ids[i] === Number(id)) {
        isFound = true;
      }
    }
    if (!isFound) {
      errors.push('Id does not exist');
    }
    return errors;
  }
}
