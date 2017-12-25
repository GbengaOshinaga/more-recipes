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
}
