import { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_IN_FAILURE, SIGN_UP_FAILURE } from './actions';
import AccountsApi from '../api/AccountsApi';
/**
 * Updates reducer if sign in is successful
 * @param {*} response
 * @returns {Object} action
 */
export function updateSignInSuccess(response) {
  return { type: SIGN_IN_SUCCESS, response };
}

/**
 * Updates reducer if sign up is successful
 * @param {*} response
 * @returns {Object} action
 */
export function updateSignUpSuccess(response) {
  return { type: SIGN_UP_SUCCESS, response };
}

/**
 * Updates reducer if sign up fails
 * @param {*} response
 * @returns {object} object
 */
export function updateSignUpFailure(response) {
  return { type: SIGN_UP_FAILURE, response };
}

/**
 * Updates reducer if sign in fails
 * @param {*} response
 * @returns {object} object
 */
export function updateSignInFailure(response) {
  return { type: SIGN_IN_FAILURE, response };
}

/**
 * Signs in
 * @param {*} credentials
 * @returns {object} response
 */
export function signIn(credentials) {
  return function (dispatch) {
    return AccountsApi.signIn(credentials);
  };
}

/**
 * Sign up
 * @param {*} data
 * @returns {function} function
 */
export function signUp(data) {
  return function (dispatch) {
    return AccountsApi.signUp(data);
  };
}
