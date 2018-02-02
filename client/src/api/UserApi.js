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

  /**
   * Method for getting user's favourites
   * @param {*} token
   * @returns {*} Promise
   */
  static getFavourites(token) {
    return fetch('http://localhost:8000/api/v1/users/recipes/favourites', {
      method: 'get',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': token
      }
    });
  }

  /**
   * Method for editing user
   * @param {*} token
   * @param {*} data
   * @returns {*} Promise
   */
  static modifyUser(token, data) {
    return fetch('http://localhost:8000/api/v1/users/edit', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': token
      },
      body: `firstName=${data.firstName}&lastName=${data.lastName}&email=${data.email}&about=${data.about}&profilePic=${data.profilePic}`
    });
  }

  /**
   * Method for editing recipe
   * @param {*} token
   * @param {*} id
   * @param {*} data
   * @returns {*} Promise
   */
  static editRecipe(token, id, data) {
    return fetch(`http://localhost:8000/api/v1/recipes/${id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Token': token
      },
      body: `name=${data.recipeName}&description=${data.recipeDescription}&ingredients=${data.ingredients.join(',')}&image=${data.imageURL}`
    });
  }

  /**
   * Upload image to cloudinary
   * @param {*} imageFile
   * @returns {*} Promise
   */
  static uploadImage(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', 'tyut3vgq');

    return fetch('https://api.cloudinary.com/v1_1/king-more-recipes/image/upload', {
      method: 'post',
      body: formData
    });
  }
}
