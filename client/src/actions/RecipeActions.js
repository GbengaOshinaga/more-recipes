import RecipesApi from '../api/RecipesApi';
import UserApi from '../api/UserApi';
import * as types from './actions';

/**
 * Updates reducer if get recipes action is successful
 * @param {Array} response
 * @returns {Object} object
 */
function updateGetRecipesSuccess(response) {
  return { type: types.GET_RECIPES_SUCCESS, response };
}

/**
 * Updates reducer if get reviews action is successful
 * @param {Array} response
 * @returns {Object} object
 */
function updateGetReviewsSuccess(response) {
  return { type: types.GET_REVIEWS_SUCCESS, response };
}

/**
 * Updates reducer if get recipe action is successful
 * @param {Object} response
 * @returns {Object} object
 */
function updateGetRecipeSuccess(response) {
  return { type: types.GET_RECIPE_SUCCESS, response };
}

/**
 * Updates reducer if add review action is successful
 * @param {Object} response
 * @returns {Object} object
 */
function updateAddReviewSuccess(response) {
  return { type: types.ADD_REVIEW_SUCCESS, response };
}

/**
 * Updates reducer with search results
 * @param {Array} response
 * @returns {Object} object
 */
function updateSearchResultsSuccess(response) {
  return { type: types.GET_SEARCH_RESULTS, response };
}

/**
 * Updates reducer if there are no results
 * @returns {Object} object
 */
function updateSearchResultsFailure() {
  return { type: types.GET_SEARCH_RESULTS_FAILURE };
}

/**
 * Updates reducer if get user favourites action is successful
 * @param {Object} response
 * @returns {Object} object
 */
function updateUserFavouritesSuccess(response) {
  return { type: types.GET_USER_FAVOURITES_SUCCESS, response };
}


/**
 * Updates reducer if get user favourites action is not successful
 * @returns {Object} object
 */
function updateUserFavouritesFailure() {
  return { type: types.GET_USER_FAVOURITES_FAILURE };
}

/**
 * Updates reducer if getting most favourited recipes is successful
 * @param {Array} response
 * @returns {Object} object
 */
function updateGetMostFavouritedSuccess(response) {
  return { type: types.GET_MOST_FAVOURITED_RECIPES_SUCCESS, response };
}

/**
 * Updates reducer if vote is successful
 * @param {Object} response
 * @returns {Object} object
 */
function updateVoteSuccess(response) {
  return { type: types.VOTE_SUCCESS, response };
}

/**
 * Updates pagination meta reducer
 * @param {Object} response
 *
 * @returns {Object} object
 */
function updatePaginationMeta(response) {
  return { type: types.GET_PAGINATION_META, response };
}

/**
 * Updates reviews pagination meta reducer
 * @param {Object} response
 *
 * @returns {Object} object
 */
function updateReviewsPaginationMeta(response) {
  return { type: types.GET_REVIEWS_PAGINATION_META, response };
}

/**
 * Clear recipes
 *
 * @returns {Object} object
*/
function clearRecipesState() {
  return { type: types.CLEAR_RECIPES };
}

/**
 * Clear pagination data
 *
 * @returns {Object} object
 */
function clearPagination() {
  return { type: types.CLEAR_PAGINATION };
}


/**
 * Action to get all recipes
 * @param {String} next
 *
 * @returns {func} dispatch
 */
export function getAllRecipes(next) {
  return function (dispatch) {
    return RecipesApi.getAllRecipes(next)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          response.data.recipes.map((recipe) => {
            recipe.Reviews = [];
          });
          if (!response.data.paginationMeta.previous) {
            dispatch(clearRecipesState());
            dispatch(clearPagination());
          }
          dispatch(updateGetRecipesSuccess(response.data.recipes));
          dispatch(updatePaginationMeta(response.data.paginationMeta));
        }
      });
  };
}

/**
   * Get recipe reviews
   * @param {Number} id
   * @param {String} next
   *
   * @returns {Promise} response
   */
export function getRecipeReviews(id, next) {
  return function (dispatch) {
    return RecipesApi.getRecipeReviews(id, next)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateGetReviewsSuccess(response.data.reviews));
          dispatch(updateReviewsPaginationMeta(response.data.paginationMeta));
        }
      });
  };
}

/**
 * Action to get single recipe
 * @param {Number} id
 * @returns {func} dispatch
 */
export function getRecipe(id) {
  return function (dispatch) {
    return RecipesApi.getRecipe(id)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          response.data.recipe.Reviews = [];
          dispatch(updateGetRecipeSuccess(response.data.recipe));
        }
      });
  };
}

/**
 * Action to add review for recipe
 * @param {Number} id
 * @param {String} token
 * @param {String} review
 * @returns {func} dispatch
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
 * @param {Number} id
 * @param {String} token
 * @returns {func} dispatch
 */
export function upvoteRecipe(id, token) {
  return function (dispatch) {
    return RecipesApi.upvoteRecipe(id, token)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateVoteSuccess(response.data.recipe));
        }
      });
  };
}

/**
 * Action to downvote a recipe
 * @param {Number} id
 * @param {String} token
 * @returns {func} dispatch
 */
export function downvoteRecipe(id, token) {
  return function (dispatch) {
    return RecipesApi.downvoteRecipe(id, token)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateVoteSuccess(response.data.recipe));
        }
      });
  };
}

/**
 * Action to search for recipes
 * @param {String} query
 * @returns {func} dispatch
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
 * @param {String} token
 * @param {Number} recipeId
 * @returns {func} dispatch
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
 * @param {String} token
 * @returns {func} dispatch
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
 * @param {String} token
 * @param {Number} recipeId
 * @returns {func} dispatch
 */
export function deleteFavourite(token, recipeId) {
  return function (dispatch) {
    return RecipesApi.deleteFavourite(token, recipeId)
      .then(response => response.json())
      .then((response) => {
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

/**
 * Action to get most favourited recipes
 * @returns {func} dispatch
 */
export function getMostFavouritedRecipes() {
  return function (dispatch) {
    return RecipesApi.getMostFavourited()
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          dispatch(updateGetMostFavouritedSuccess(response.data.recipes));
        }
      });
  };
}
