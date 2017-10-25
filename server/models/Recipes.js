
/**
 *Recipes Entity class to provide data
 */
export default class Recipes {
  /**
     * Constructor
     */
  constructor() {
    this._recipes = [['Recipe Name', 'Recipe Details', 'Ingredients'],
      ['Second Recipe', 'More Details', 'New Ingredients']];
  }

  /**
   * Method to add to the recipe
   * @param {*} recipe
   * @returns {Recipes} added recipe
   */
  addRecipe(recipe) {
    this._recipes.push(recipe);
    return recipe;
  }

  /**
   * Method returns all recipes
   * @returns {Recipes} recipes
   */
  getRecipes() {
    return this._recipes;
  }
}

