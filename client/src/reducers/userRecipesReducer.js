import initialState from './initialState';
import * as types from '../actions/actions';

/**
 * userRecipes reducer
 * @param {*} state
 * @param {*} action
 * @returns {object} new state
 */
export default function userRecipesReducer(state = initialState.userRecipes, action) {
  const { response } = action;
  switch (action.type) {
    case types.ADD_RECIPE_SUCCESS:
      return [...state, response];

    case types.GET_USERS_RECIPES_SUCCESS:
      return [...response];

    case types.DELETE_RECIPE_SUCCESS:
      return [...state.filter(recipe => recipe.id !== Number(action.id))];

    case types.EDIT_RECIPE_SUCCESS:
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
