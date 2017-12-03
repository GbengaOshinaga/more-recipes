import { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_IN_FAILURE, SIGN_UP_FAILURE } from '../actions/actions';
import initialState from './initialState';

/**
 * Account Reducer function
 * @param {*} state
 * @param {*} action
 * @returns {Object} new state
 */
export default function accountReducer(state = initialState, action) {
  const token = action.response;
  const { errors } = action;
  switch (action.type) {
    case SIGN_IN_SUCCESS:
      return { ...state.token, token };
    case SIGN_UP_SUCCESS:
      return { ...state.token, token };
    case SIGN_IN_FAILURE:
      return { ...state.errors, errors };
    case SIGN_UP_FAILURE:
      return { ...state.errors, errors };
    default:
      return state;
  }
}
