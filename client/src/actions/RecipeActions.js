import RecipesApi from '../api/RecipesApi';
import { GET_RECIPES_SUCCESS, GET_RECIPE_SUCCESS, ADD_REVIEW_SUCCESS, GET_SEARCH_RESULTS, GET_SEARCH_RESULTS_FAILURE } from './actions';

/**
 * Updates reducer if get recipes action is successful
 * @param {*} response
 * @returns {Object} object
 */
function updateGetRecipesSuccess(response) {
  return { type: GET_RECIPES_SUCCESS, response };
}

/**
 * Updates reducer if get recipe action is successful
 * @param {*} response
 * @returns {Object} object
 */
function updateGetRecipeSuccess(response) {
  return { type: GET_RECIPE_SUCCESS, response };
}

/**
 * Updates reducer if add review action is successful
 * @param {*} response
 * @returns {Object} object
 */
function updateAddReviewSuccess(response) {
  return { type: ADD_REVIEW_SUCCESS, response };
}

/**
 * Updates reducer with search results
 * @param {*} response
 * @returns {Object} object
 */
function updateSearchResultsSuccess(response) {
  return { type: GET_SEARCH_RESULTS, response };
}

/**
 * Updates reducer if there are no results
 * @param {*} response
 * @returns {Object} object
 */
function updateSearchResultsFailure() {
  return { type: GET_SEARCH_RESULTS_FAILURE };
}

/**
 * Action to get all recipes
 * @returns {*} response
 */
export function getAllRecipes() {
  return function (dispatch) {
    return RecipesApi.getAllRecipes()
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateGetRecipesSuccess(response.data.recipes));
        }
      });
  };
}

/**
 * Action to get single recipe
 * @param {*} id
 * @returns {*} response
 */
export function getRecipe(id) {
  return function (dispatch) {
    return RecipesApi.getRecipe(id)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateGetRecipeSuccess(response.data.recipe));
        }
      });
  };
}

/**
 * Action to add review for recipe
 * @param {*} id
 * @param {*} token
 * @param {*} review
 * @returns {*} response
 */
export function addReview(id, token, review) {
  return function (dispatch) {
    return RecipesApi.addReview(id, token, review)
      .then(response => response.json())
      .then((response) => {
        dispatch(updateAddReviewSuccess(response.data.review));
      });
  };
}

/**
 * Action to upvote a recipe
 * @param {*} id
 * @param {*} token
 * @returns {*} response
 */
export function upvoteRecipe(id, token) {
  return function (dispatch) {
    return RecipesApi.upvoteRecipe(id, token)
      .then(response => response.json())
      .then((response) => {
        console.log(response);
      });
  };
}

/**
 * Action to downvote a recipe
 * @param {*} id
 * @param {*} token
 * @returns {*} response
 */
export function downvoteRecipe(id, token) {
  return function (dispatch) {
    return RecipesApi.downvoteRecipe(id, token)
      .then(response => response.json())
      .then((response) => {
        console.log(response);
      });
  };
}

/**
 * Action to search for recipes
 * @param {*} query
 * @returns {*} response
 */
export function search(query) {
  return function (dispatch) {
    return RecipesApi.search(query)
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === 'success') {
          dispatch(updateSearchResultsSuccess(response.data.recipes));
        } else {
          dispatch(updateSearchResultsFailure());
        }
      });
  };
}
