import initialState from './initialState';
import * as types from '../actions/actions';

/**
 * Recipes reducer
 * @param {*} state
 * @param {*} action
 * @return {*} new state
 */
export default function recipesReducer(state = initialState.recipes, action) {
  const { response } = action;
  switch (action.type) {
    case types.CLEAR_RECIPES:
      return [];

    case types.GET_RECIPES_SUCCESS:
      return [...state.concat(response)];

    case types.GET_RECIPE_SUCCESS:
      return [...state, response];

    case types.VOTE_SUCCESS:
      return [...state.map((recipe) => {
        if (recipe.id === response.id) {
          return { ...recipe, ...response };
        }
        return recipe;
      })];

    case types.ADD_REVIEW_SUCCESS:
      return [...state.map((recipe) => {
        if (recipe.id === response.RecipeId) {
          return { ...recipe, Reviews: [...recipe.Reviews, response] };
        }
        return recipe;
      })];

    case types.GET_REVIEWS_SUCCESS:
      if (response.length === 0) {
        return state;
      }
      return state.map((recipe) => {
        if (recipe.id === response[0].RecipeId) {
          return { ...recipe, Reviews: [...recipe.Reviews.concat(response)] };
        }
        return recipe;
      });

    default:
      return state;
  }
}
