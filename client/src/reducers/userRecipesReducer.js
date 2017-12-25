import initialState from './initialState';
import { ADD_RECIPE_SUCCESS, ADD_RECIPE_FAILURE, GET_USERS_RECIPES_SUCCESS, GET_USERS_RECIPES_FAILURE, DELETE_RECIPE_SUCCESS } from '../actions/actions';

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
    case DELETE_RECIPE_SUCCESS:
      return [...state.filter(recipe => recipe.id !== action.id)];
    default:
      return state;
  }
}
