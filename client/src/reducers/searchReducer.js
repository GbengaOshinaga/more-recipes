import initialState from './initialState';
import { GET_SEARCH_RESULTS, GET_SEARCH_RESULTS_FAILURE } from '../actions/actions';

/**
 * Search Results reducer
 * @param {*} state
 * @param {*} action
 * @returns {*} new state
 */
export default function searchReducer(state = initialState.searchResults, action) {
  const { response } = action;
  switch (action.type) {
    case GET_SEARCH_RESULTS:
      return [...response];
    case GET_SEARCH_RESULTS_FAILURE:
      return [];
    default:
      return state;
  }
}
