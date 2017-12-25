import initialState from './initialState';
import { GET_RECIPES_SUCCESS } from '../actions/actions';

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
      return state.concat(response);
    default:
      return state;
  }
}
