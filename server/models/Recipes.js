
/**
 *Recipes Entity class to provide data
 */
export default class Recipes {
  /**
     * Constructor
     */
  constructor() {
    this._recipes = [
      {
        id: 1,
        name: 'Recipe Name',
        details: 'Recipe Details',
        ingredients: 'Ingredients',
        upvotes: 20,
        reviews: ['Love it', 'Hate it']
      },
      {
        id: 2,
        name: 'Second Recipe',
        details: 'More Details',
        ingredients: 'New Ingredients',
        upvotes: 40,
        reviews: ['I Love it', 'I Hate it']
      }
    ];
  }

  /**
   * Method to add to the recipe
   * @param {*} recipe
   * @returns {Recipes} added recipe
   */
  addRecipe(recipe) {
    recipe.id = this.getRecipes().length + 1;
    this._recipes.push(recipe);
    return this.getRecipes()[this.getRecipes().length - 1];
  }

  /**
   * Method returns all recipes
   * @returns {Recipes} recipes
   */
  getRecipes() {
    return this._recipes;
  }

  /**
   * Modifies a recipe
   * @param {*} id
   * @param {*} recipe
   * @returns {Recipes} recipes
   */
  modifyRecipe(id, recipe) {
    let modifiedRecipe;
    for (const i in this._recipes) {
      if (this._recipes[i].id === Number(recipe.id)) {
        this._recipes[i].name = recipe.name;
        this._recipes[i].details = recipe.details;
        this._recipes[i].ingredients = recipe.ingredients;
        modifiedRecipe = this._recipes[i];
      }
    }
    return modifiedRecipe;
  }
}

