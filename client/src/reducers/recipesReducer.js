import initialState from './initialState';
import { GET_RECIPES_SUCCESS, VOTE_SUCCESS, ADD_REVIEW_SUCCESS, GET_RECIPE_SUCCESS } from '../actions/actions';

/**
 * Recipes reducer
 * @param {*} state
 * @param {*} action
 * @return {*} new state
 */
export default function recipesReducer(state = initialState.recipes, action) {
  const { response } = action;
  switch (action.type) {
    case GET_RECIPES_SUCCESS:
      return [...response];

    case GET_RECIPE_SUCCESS:
      return [...state, response];

    case VOTE_SUCCESS:
      return [...state.map((recipe) => {
        if (recipe.id === response.id) {
          return { ...recipe, ...response };
        }
        return recipe;
      })];

    case ADD_REVIEW_SUCCESS:
      return [...state.map((recipe) => {
        if (recipe.id === response.RecipeId) {
          return { ...recipe, Reviews: [...recipe.Reviews, response] };
        }
        return recipe;
      })];

    default:
      return state;
  }
}
