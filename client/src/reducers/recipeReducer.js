import initialState from './initialState';
import { GET_RECIPE_SUCCESS } from '../actions/actions';

/**
 * Recipes reducer
 * @param {*} state
 * @param {*} action
 * @return {*} new state
 */
export default function recipesReducer(state = initialState.recipe, action) {
  const { response } = action;
  switch (action.type) {
    case GET_RECIPE_SUCCESS:
      return { ...state, ...response };
    default:
      return state;
  }
}
