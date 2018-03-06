import initialState from './initialState';
import * as types from '../actions/actions';

/**
 * Pagination meta reducer
 * @param {*} state
 * @param {*} action
 *
 * @returns {Object} new state
 */
export default function paginationReducer(state = initialState.paginationMeta, action) {
  const { response } = action;
  switch (action.type) {
    case types.GET_PAGINATION_META:
      return { ...response };

    default:
      return state;
  }
}
