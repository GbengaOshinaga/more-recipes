import UserApi from '../api/UserApi';
import { ADD_RECIPE_SUCCESS, ADD_RECIPE_FAILURE, DELETE_RECIPE_SUCCESS } from './actions';

/**
 * Updates reducer if add recipe action is successful
 * @param {*} response
 * @returns {Object} object
 */
function updateAddRecipeSuccess(response) {
  return { type: ADD_RECIPE_SUCCESS, response };
}

/**
 * Updates reducer if delete recipe action is successful
 * @param {*} id
 * @returns {Object} object
 */
function updateDeleteRecipeSuccess(id) {
  return { type: DELETE_RECIPE_SUCCESS, id };
}

/**
 * Action to add recipe
 * @param {*} token access token
 * @param {*} data
 * @returns {*} response
 */
export function addRecipe(token, data) {
  return function (dispatch) {
    return UserApi.addRecipe(token, data)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateAddRecipeSuccess(response.data.recipe));
        } else {
          console.log(response);
          console.log('something went wrong');
        }
      });
  };
}

/**
 * Action to delete recipe
 * @param {*} token
 * @param {*} id
 * @returns {*} response
 */
export function deleteRecipe(token, id) {
  return function (dispatch) {
    return UserApi.deleteRecipe(token, id)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          console.log(response);
          dispatch(updateDeleteRecipeSuccess(id));
        }
      });
  };
}

/**
 * Action to get user recipes
 * @param {*} token
 * @returns {*} response
 */
export function getUserRecipes(token) {
  return function (dispatch) {
    return UserApi.getUserRecipes(token)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateAddRecipeSuccess(response.data.recipes));
        }
      });
  };
}
