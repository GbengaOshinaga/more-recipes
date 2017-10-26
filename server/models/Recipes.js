
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
      },
      {
        id: 3,
        name: 'Third Recipe',
        details: 'More Details',
        ingredients: 'New Ingredients',
        upvotes: 10,
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
   * Returns sorted recipes
   */
  getSortedRecipes() {
    return this.sort(this._recipes);
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

  /**
   * Reverse sorts and merges the left and right array
   * @param {*} leftArray
   * @param {*} rightArray
   * @returns {Array} merged sorted recipes
   */
  merge(leftArray, rightArray) {
    const array = [];

    while (leftArray.length && rightArray.length) {
      if (leftArray[0].upvotes > rightArray[0].upvotes) {
        array.push(leftArray.shift());
      } else {
        array.push(rightArray.shift());
      }
    }
    return array.concat(leftArray).concat(rightArray);
  }

  /**
   * Recursively splits the recipes array and
   * passes it to the merge method to be sorted
   * @param {*} array recipes to be sorted
   * @returns {Array} sorted array
   */
  sort(array) {
    if (array.length < 2) {
      return array;
    }
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    return this.merge(this.sort(left), this.sort(right));
  }
}

