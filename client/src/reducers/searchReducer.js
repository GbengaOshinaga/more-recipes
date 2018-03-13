import initialState from './initialState';
import * as types from '../actions/actions';

/**
 * Search Results reducer
 * @param {Array} state
 * @param {Object} action
 *
 * @returns {Array} new state
 */
export default function searchReducer(state = initialState.searchResults, action) {
  const { response } = action;
  switch (action.type) {
    case types.GET_SEARCH_RESULTS:
      return [...response];
    case types.GET_SEARCH_RESULTS_FAILURE:
      return [];
    default:
      return state;
  }
}
