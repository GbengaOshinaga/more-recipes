import { SIGN_IN_SUCCESS } from '../actions/actions';

/**
 * Account Reducer function
 * @param {*} state
 * @param {*} action
 * @returns {Object} new state
 */
export default function accountReducer(state = [], action) {
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return [...state, Object.assign({}, action.response)];
    default:
      return state;
  }
}
