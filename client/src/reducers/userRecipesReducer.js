import initialState from './initialState';
import { ADD_RECIPE_SUCCESS, DELETE_RECIPE_SUCCESS, EDIT_RECIPE_SUCCESS, GET_USERS_RECIPES_SUCCESS } from '../actions/actions';

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
      return [...state, response];
    case GET_USERS_RECIPES_SUCCESS:
      return [...response];
    case DELETE_RECIPE_SUCCESS:
      return [...state.filter(recipe => recipe.id !== Number(action.id))];
    case EDIT_RECIPE_SUCCESS:
      return [...state.map((recipe) => {
        if (recipe.id === response.id) {
          recipe = response;
        }
        return recipe;
      })];
    default:
      return state;
  }
}
