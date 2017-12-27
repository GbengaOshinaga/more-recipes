import 'babel-polyfill';

/**
 * Class for accessing recipes api endpoints
 */
export default class RecipesApi {
  /**
     * Method for getting all recipes
     * @returns {*} Promise
     */
  static getAllRecipes() {
    return fetch('http://localhost:8000/api/v1/recipes', {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
  }

  /**
   * Method for getting a single recipe
   * @param {*} id
   * @returns {*} Promise
   */
  static getRecipe(id) {
    return fetch(`http://localhost:8000/api/v1/recipes/${id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  /**
   * Method for adding review for a recipe
   * @param {*} id
   * @param {*} token
   * @param {*} review
   * @returns {*} Promise
   */
  static addReview(id, token, review) {
    debugger;
    return fetch(`http://localhost:8000/api/v1/recipes/${id}/reviews`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': token
      },
      body: `review=${review}`
    });
  }
}
