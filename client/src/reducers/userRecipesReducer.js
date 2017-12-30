import initialState from './initialState';
import { ADD_RECIPE_SUCCESS, DELETE_RECIPE_SUCCESS } from '../actions/actions';

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
      return [...response];
    case DELETE_RECIPE_SUCCESS:
      return [...state.filter(recipe => recipe.id !== Number(action.id))];
    default:
      return state;
  }
}
