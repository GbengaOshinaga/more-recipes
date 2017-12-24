import 'babel-polyfill';

/**
 * Class for accessing user api endpoints
 */
export default class User {
  /**
     * Method for getting recipes created by user
     * @param {*} token
     * @returns {object} Promise
     */
  static getUserRecipes(token) {
    return fetch('http://localhost:8000/api/v1/users/recipes', {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': token
      }
    });
  }

  /**
     * Method for getting recipes created by user
     * @param {*} token
     * @param {*} data
     * @returns {object} Promise
     */
  static addRecipe(token, data) {
    return fetch('http://localhost:8000/api/v1/recipes', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': token
      },
      body: `name=${data.recipeName}&description=${data.recipeDescription}&ingredients=${data.ingredients.join(',')}&image=${data.imageURL}`
    });
  }

  /**
   * Method for deleting recipe
   * @param {*} token
   * @param {*} id
   * @returns {*} Promise
   */
  static deleteRecipe(token, id) {
    return fetch(`http://localhost:8000/api/v1/recipes/${id}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': token
      }
    });
  }
}
