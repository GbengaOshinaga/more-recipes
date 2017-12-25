import RecipesApi from '../api/RecipesApi';
import { GET_RECIPES_SUCCESS } from './actions';

/**
 * Updates reducer if get recipes action is successful
 * @param {*} response
 * @returns {Object} object
 */
function updateGetRecipesSuccess(response) {
  return { type: GET_RECIPES_SUCCESS, response };
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
