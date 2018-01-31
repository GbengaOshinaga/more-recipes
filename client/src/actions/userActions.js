import { sessionService } from 'redux-react-session';
import UserApi from '../api/UserApi';
import {
  ADD_RECIPE_SUCCESS,
  DELETE_RECIPE_SUCCESS,
  GET_USER_FAVOURITES_SUCCESS,
  EDIT_RECIPE_SUCCESS,
  GET_USERS_RECIPES_SUCCESS,
  GET_USER_VOTES
} from './actions';

/**
 * Updates reducer if add recipe action is successful
 * @param {*} response
 * @returns {Object} object
 */
function updateAddRecipeSuccess(response) {
  return { type: ADD_RECIPE_SUCCESS, response };
}

/**
 * Updates reducer if getting user recipes is successful
 * @param {*} response
 * @returns {Object} object
 */
function updateGetUserRecipesSuccess(response) {
  return { type: GET_USERS_RECIPES_SUCCESS, response };
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
 * Updates reducer if get user favourites action is successful
 * @param {*} response
 * @returns {Object} object
 */
function updateUserFavouritesSuccess(response) {
  return { type: GET_USER_FAVOURITES_SUCCESS, response };
}

/**
 * Updates reducer if edit recipe action is successful
 * @param {*} response
 * @returns {Object} object
 */
function updateEditRecipeSuccess(response) {
  return { type: EDIT_RECIPE_SUCCESS, response };
}

/**
 * Updates reducer if get user votes is successful
 * @param {*} response
 * @returns {Object} object
 */
function updateGetUserVotes(response) {
  return { type: GET_USER_VOTES, response };
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
          dispatch(updateGetUserRecipesSuccess(response.data.recipes));
        }
      });
  };
}

/**
 * Action to get user favourites
 * @param {*} token
 * @returns {*} response
 */
export function getFavourites(token) {
  return function (dispatch) {
    return UserApi.getFavourites(token)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateUserFavouritesSuccess(response.data.favourites));
        }
      });
  };
}

/**
 * Action to modify user
 * @param {*} token
 * @param {*} data
 * @returns {*} response
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
 * @param {*} token
 * @param {*} id
 * @param {*} data
 * @returns {*} response
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
 * @param {*} imageFile
 * @returns {*} Promise
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
        console.log(response);
        if (response.status === 'success') {
          dispatch(updateGetUserVotes(response.data.votes));
        }
      });
  };
}
