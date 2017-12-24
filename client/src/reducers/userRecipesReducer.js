import initialState from './initialState';
import { ADD_RECIPE_SUCCESS, ADD_RECIPE_FAILURE, GET_USERS_RECIPES_SUCCESS, GET_USERS_RECIPES_FAILURE } from '../actions/actions';

/**
 * userRecipes reducer
 * @param {*} state
 * @param {*} action
 * @returns {object} new state
 */
export default function userRecipesReducer(state = initialState.userRecipes, action) {
  const { response } = action;
  switch (action.type) {
    case ADD_RECIPE_SUCCESS:
      return state.concat(response);
    default:
      return state;
  }
}
