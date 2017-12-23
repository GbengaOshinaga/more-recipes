import UserApi from '../api/UserApi';
import { ADD_RECIPE_SUCCESS, ADD_RECIPE_FAILURE } from './actions';

/**
 * Updates reducer if add recipe action is successful
 * @param {*} response
 * @returns {object} object
 */
function updateAddRecipeSuccess(response) {
  return { type: ADD_RECIPE_SUCCESS, response };
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
            console.log(response);
            dispatch(updateAddRecipeSuccess(response.data));
        }else {
            console.log(response);
            console.log('something went wrong');
        }
      });
  };
}
