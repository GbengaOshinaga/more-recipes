import RecipesApi from '../api/RecipesApi';
import { GET_RECIPES_SUCCESS, GET_RECIPE_SUCCESS } from './actions';

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
 * Action to get all recipes
 * @returns {*} response
 */
export function getAllRecipes() {
  return function (dispatch) {
    return RecipesApi.getAllRecipes()
      .then(response => response.json())
      .then((response) => {
        console.log(response);
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
        console.log(response);
        if (response.status === 'success') {
          dispatch(updateGetRecipeSuccess(response.data.recipe));
        }
      });
  };
}
