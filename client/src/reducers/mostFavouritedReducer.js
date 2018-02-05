import initialState from './initialState';
import { GET_MOST_FAVOURITED_RECIPES_SUCCESS } from '../actions/actions';

/**
 * Most favourited recipes reducer
 * @param {*} state
 * @param {*} action
 * @returns {*} new state
 */
export default function mostFavouritedReducer(state = initialState.mostFavourited, action) {
  const { response } = action;
  switch (action.type) {
    case GET_MOST_FAVOURITED_RECIPES_SUCCESS:
      return [...response];
    default:
      return state;
  }
}
