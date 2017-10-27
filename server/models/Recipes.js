
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
    recipe.id = this.recipes.length + 1;
    this._recipes.push(recipe);
    return this.recipes[this.recipes.length - 1];
  }

  /**
   * Method returns all recipes
   * @returns {Recipes} recipes
   */
  get recipes() {
    return this._recipes;
  }

  /**
   * Returns sorted recipes
   * @param {String} format
   * @returns {Array} sorted recipe
   */
  getSortedRecipes(format) {
    return this.sort(this._recipes, format);
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
      if (this._recipes[i].id === Number(id)) {
        this._recipes[i].name = recipe.name;
        this._recipes[i].details = recipe.details;
        this._recipes[i].ingredients = recipe.ingredients;
        modifiedRecipe = this._recipes[i];
      }
    }
    return modifiedRecipe;
  }

  /**
   * Deletes the specified recipe
   * @param {*} id
   * @returns {Array} deleted recipe
   */
  deleteRecipe(id) {
    let recipe;
    for (let i = 0; i < this._recipes.length; i++) {
      if (this._recipes[i].id === Number(id)) {
        recipe = this._recipes.splice(i, 1);
      }
    }
    if (recipe === undefined) {
      return ['Id does not exist'];
    }
    return recipe;
  }

  /**
   * Adds a review to a recipe
   * @param {*} id
   * @param {*} review
   * @returns {Recipe} recipe containing added review
   */
  addReview(id, review) {
    let addedReview;
    for (let i = 0; i < this._recipes.length; i++) {
      if (this._recipes[i].id === Number(id)) {
        if (this._recipes.reviews) {
          this._recipes[i].reviews.push(review);
        } else {
          this._recipes[i].reviews = [];
          this._recipes[i].reviews.push(review);
        }
        addedReview = this._recipes[i];
      }
    }
    return addedReview;
  }

  /**
   * Sorts in descending order and merges the left and right array
   * @param {*} leftArray
   * @param {*} rightArray
   * @returns {Array} merged sorted recipes
   */
  mergeDes(leftArray, rightArray) {
    const array = [];

    while (leftArray.length && rightArray.length) {
      if (leftArray[0].upvotes > rightArray[0].upvotes) {
        array.push(leftArray.shift());
      } else {
        array.push(rightArray.shift());
      }
    }
    return array.concat(leftArray.slice()).concat(rightArray.slice());
  }

  /**
   * Sorts in ascending order and merges the left and right array
   * @param {*} leftArray
   * @param {*} rightArray
   * @returns {Array} merged sorted recipes
   */
  mergeAsc(leftArray, rightArray) {
    const array = [];

    while (leftArray.length && rightArray.length) {
      if (leftArray[0].upvotes < rightArray[0].upvotes) {
        array.push(leftArray.shift());
      } else {
        array.push(rightArray.shift());
      }
    }
    return array.concat(leftArray.slice()).concat(rightArray.slice());
  }

  /**
   * Recursively splits the recipes array and
   * passes it to the merge method to be sorted
   * @param {*} array recipes to be sorted
   * @param {*} format asc or des
   * @returns {Array} sorted array
   */
  sort(array, format) {
    if (array.length < 2) {
      return array;
    }
    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);
    if (format === 'des') {
      return this.mergeDes(this.sort(left, 'des'), this.sort(right, 'des'));
    }
    return this.mergeAsc(this.sort(left), this.sort(right));
  }

  /**
   * Gets all recipes IDs
   * @returns {Array} array containing ids
   */
  getRecipesIDs() {
    const ids = [];
    for (let i = 0; i < this._recipes.length; i++) {
      ids.push(this._recipes[i].id);
    }
    return ids;
  }
}

