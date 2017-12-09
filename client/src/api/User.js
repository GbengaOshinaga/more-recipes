import 'babel-polyfill';

/**
 * Class for accessing user api endpoints
 */
export default class User {
  /**
     * Method for getting recipes created by user
     * @param {*} userId
     * @param {*} token
     * @returns {object} Promise
     */
  static getUserRecipes(userId, token) {
    return fetch('http://localhost:8000/api/v1/users/recipes', {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': token
      }
    });
  }
}
