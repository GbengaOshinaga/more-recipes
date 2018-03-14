import initialState from './initialState';
import * as types from '../actions/actions';

/**
 * Pagination meta reducer
 * @param {Object} state
 * @param {Object} action
 *
 * @returns {Object} new state
 */
export default function paginationReducer(state = initialState.reviewsPaginationMeta, action) {
  const { response } = action;
  switch (action.type) {
    case types.GET_REVIEWS_PAGINATION_META:
      return { ...response };

    default:
      return state;
  }
}
