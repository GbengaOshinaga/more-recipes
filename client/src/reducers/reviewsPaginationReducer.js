import initialState from './initialState';
import { GET_REVIEWS_PAGINATION_META } from '../actions/actions';

/**
 * Pagination meta reducer
 * @param {*} state
 * @param {*} action
 *
 * @returns {Object} new state
 */
export default function paginationReducer(state = initialState.reviewsPaginationMeta, action) {
  const { response } = action;
  switch (action.type) {
    case GET_REVIEWS_PAGINATION_META:
      return { ...response };
    default:
      return state;
  }
}
