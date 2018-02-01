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
    return fetch(`http://localhost:8000/api/v1/recipes/${id}/reviews`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': token
      },
      body: `review=${review}`
    });
  }

  /**
   * Method for upvoting recipe
   * @param {*} id
   * @param {*} token
   * @returns {*} Promise
   */
  static upvoteRecipe(id, token) {
    return fetch(`http://localhost:8000/api/v1/recipes/upvote/${id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': token
      }
    });
  }

  /**
   * Method for downvoting recipe
   * @param {*} id
   * @param {*} token
   * @returns {*} Promise
   */
  static downvoteRecipe(id, token) {
    return fetch(`http://localhost:8000/api/v1/recipes/downvote/${id}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': token
      }
    });
  }

  /**
   * Search for recipe
   * @param {*} query
   * @returns {*} Promise
   */
  static search(query) {
    return fetch(`http://localhost:8000/api/v1/recipes?query=${query}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
  }

  /**
   * Method for adding to user's favourites
   * @param {*} token
   * @param {*} recipeId
   * @returns {*} Promise
   */
  static addFavourite(token, recipeId) {
    return fetch(`http://localhost:8000/api/v1/users/recipes/${recipeId}/favourites`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': token
      }
    });
  }

  /**
   * Method for delete a user's favourite
   * @param {*} token
   * @param {*} recipeId
   * @returns {*} Promise
   */
  static deleteFavourite(token, recipeId) {
    return fetch(`http://localhost:8000/api/v1/users/recipes/${recipeId}/favourites`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': token
      }
    });
  }
}
