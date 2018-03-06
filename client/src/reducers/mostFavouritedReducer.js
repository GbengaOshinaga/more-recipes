import initialState from './initialState';
import * as types from '../actions/actions';

/**
 * Most favourited recipes reducer
 * @param {*} state
 * @param {*} action
 * @returns {*} new state
 */
export default function mostFavouritedReducer(state = initialState.mostFavourited, action) {
  const { response } = action;
  switch (action.type) {
    case types.GET_MOST_FAVOURITED_RECIPES_SUCCESS:
      return [...response];

    case types.VOTE_SUCCESS:
      return [...state.map((recipe) => {
        if (recipe.id === response.id) {
          return { ...recipe, ...response };
        }
        return recipe;
      })];

    default:
      return state;
  }
}
