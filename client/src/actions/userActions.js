import { sessionService } from 'redux-react-session';
import UserApi from '../api/UserApi';
import * as types from './actions';

/**
 * Updates reducer if add recipe action is successful
 * @param {Object} response
 * @returns {Object} object
 */
function updateAddRecipeSuccess(response) {
  return { type: types.ADD_RECIPE_SUCCESS, response };
}

/**
 * Updates reducer if getting user recipes is successful
 * @param {Array} response
 * @returns {Object} object
 */
function updateGetUserRecipesSuccess(response) {
  return { type: types.GET_USERS_RECIPES_SUCCESS, response };
}

/**
 * Updates reducer if delete recipe action is successful
 * @param {Number} id
 * @returns {Object} object
 */
function updateDeleteRecipeSuccess(id) {
  return { type: types.DELETE_RECIPE_SUCCESS, id };
}

/**
 * Updates reducer if edit recipe action is successful
 * @param {Object} response
 * @returns {Object} object
 */
function updateEditRecipeSuccess(response) {
  return { type: types.EDIT_RECIPE_SUCCESS, response };
}

/**
 * Updates reducer if get user votes is successful
 * @param {Object} response
 * @returns {Object} object
 */
function updateGetUserVotes(response) {
  return { type: types.GET_USER_VOTES, response };
}

/**
 * Action to add recipe
 * @param {String} token access token
 * @param {Object} data
 * @returns {func} dispatch
 */
export function addRecipe(token, data) {
  return function (dispatch) {
    return UserApi.addRecipe(token, data)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateAddRecipeSuccess(response.data.recipe));
        } else {
          throw (response.data.errors);
        }
      });
  };
}

/**
 * Action to delete recipe
 * @param {String} token
 * @param {Number} id
 * @returns {func} dispatch
 */
export function deleteRecipe(token, id) {
  return function (dispatch) {
    return UserApi.deleteRecipe(token, id)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateDeleteRecipeSuccess(id));
        }
      });
  };
}

/**
 * Action to get user recipes
 * @param {String} token
 * @returns {func} dispatch
 */
export function getUserRecipes(token) {
  return function (dispatch) {
    return UserApi.getUserRecipes(token)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateGetUserRecipesSuccess(response.data.recipes));
        }
      });
  };
}

/**
 * Action to modify user
 * @param {String} token
 * @param {Object} data
 * @returns {func} dispatch
 */
export function modifyUser(token, data) {
  return function (dispatch) {
    return UserApi.modifyUser(token, data)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          sessionService.saveUser(response.data.user);
        } else {
          throw (response.data.error);
        }
      });
  };
}

/**
 * Action to modify recipe
 * @param {String} token
 * @param {Number} id
 * @param {Object} data
 * @returns {func} dispatch
 */
export function editRecipe(token, id, data) {
  return function (dispatch) {
    return UserApi.editRecipe(token, id, data)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateEditRecipeSuccess(response.data.updatedRecipe));
        } else {
          throw (response.data.message || response.data.messages);
        }
      });
  };
}

/**
 * Upload image to cloudinary
 * @param {File} imageFile
 * @returns {Promise} Promise
 */
export function uploadImage(imageFile) {
  return UserApi.uploadImage(imageFile);
}

/**
 * Get user votes
 * @param {*} token
 * @returns {*} Promise
 */
export function getUserVotes(token) {
  return function (dispatch) {
    return UserApi.getUserVotes(token)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateGetUserVotes(response.data.votes));
        }
      });
  };
}
