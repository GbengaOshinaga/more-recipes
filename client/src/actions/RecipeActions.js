import RecipesApi from '../api/RecipesApi';
import UserApi from '../api/UserApi';
import {
  GET_RECIPES_SUCCESS,
  GET_RECIPE_SUCCESS,
  ADD_REVIEW_SUCCESS,
  GET_SEARCH_RESULTS,
  GET_SEARCH_RESULTS_FAILURE,
  GET_USER_FAVOURITES_SUCCESS,
  GET_USER_FAVOURITES_FAILURE,
  VOTE_SUCCESS
} from './actions';

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
 * Updates reducer if get user favourites action is successful
 * @param {Object} response
 * @returns {Object} object
 */
function updateUserFavouritesSuccess(response) {
  return { type: GET_USER_FAVOURITES_SUCCESS, response };
}


/**
 * Updates reducer if get user favourites action is not successful
 * @returns {Object} object
 */
function updateUserFavouritesFailure() {
  return { type: GET_USER_FAVOURITES_FAILURE };
}

/**
 * Updates reducer if vote is successful
 * @param {Object} response
 * @returns {Object} object
 */
function updateVoteSuccess(response) {
  return { type: VOTE_SUCCESS, response };
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
        if (response.status === 'success') {
          dispatch(updateVoteSuccess(response.data.recipe));
        }
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
        if (response.status === 'success') {
          dispatch(updateVoteSuccess(response.data.recipe));
        }
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
        if (response.status === 'success') {
          dispatch(updateSearchResultsSuccess(response.data.recipes));
        } else {
          dispatch(updateSearchResultsFailure());
        }
      });
  };
}

/**
 * Action to add favourite for user
 * @param {*} token
 * @param {*} recipeId
 * @returns {*} response
 */
export function addFavourite(token, recipeId) {
  return function (dispatch) {
    return RecipesApi.addFavourite(token, recipeId)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          UserApi.getFavourites(token)
            .then(favResponse => favResponse.json())
            .then((favResponse) => {
              if (favResponse.status === 'success') {
                dispatch(updateUserFavouritesSuccess(favResponse.data.favourites));
              }
            });
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
        } else {
          dispatch(updateUserFavouritesFailure());
        }
      });
  };
}

/**
 * Action to add favourite for user
 * @param {*} token
 * @param {*} recipeId
 * @returns {*} response
 */
export function deleteFavourite(token, recipeId) {
  return function (dispatch) {
    return RecipesApi.deleteFavourite(token, recipeId)
      .then(response => response.json())
      .then((response) => {
        console.log(response);
        if (response.status === 'success') {
          UserApi.getFavourites(token)
            .then(favResponse => favResponse.json())
            .then((favResponse) => {
              if (favResponse.status === 'success') {
                dispatch(updateUserFavouritesSuccess(favResponse.data.favourites));
              } else {
                dispatch(updateUserFavouritesFailure());
              }
            });
        }
      });
  };
}
