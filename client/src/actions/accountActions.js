import { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_IN_FAILURE, SIGN_UP_FAILURE } from './actions';
import AccountsApi from '../api/AccountsApi';
/**
 * Sign in action
 * @param {*} response
 * @returns {Object} action
 */
export function updateSignInSuccess(response) {
  return { type: SIGN_IN_SUCCESS, response };
}

/**
 * Sign up actions
 * @param {*} response
 * @returns {Object} action
 */
export function updateSignUpSuccess(response) {
  return { type: SIGN_UP_SUCCESS, response };
}

/**
 * Updates reducer if sign up fails
 * @param {*} errors
 * @returns {object} object
 */
export function updateSignUpFailure(errors) {
  return { type: SIGN_UP_FAILURE, errors };
}

/**
 * Updates reducer if sign in fails
 * @param {*} errors
 * @returns {object} object
 */
export function updateSignInFailure(errors) {
  return { type: SIGN_IN_FAILURE, errors };
}

/**
 * Signs in
 * @param {*} credentials
 * @returns {object} response
 */
export function signIn(credentials) {
  return function (dispatch) {
    return AccountsApi.signIn(credentials).then(response => response.json())
      .then((response) => {
        if (response.data.status === 'success') {
          dispatch(updateSignInSuccess(response.data.token));
        } else {
          dispatch(updateSignInFailure(response.data.message || response.data.errors));
        }
      })
      .catch((error) => { throw (error); });
  };
}

/**
 * Sign up
 * @param {*} data
 * @returns {function} function
 */
export function signUp(data) {
  return function (dispatch) {
    return AccountsApi.signUp(data)
      .then(response => response.json())
      .then((response) => {
        if (response.data.status === 'success') {
          dispatch(updateSignUpSuccess(response.data.token));
        } else {
          dispatch(updateSignUpFailure(response.data.message || response.data.errors));
        }
      })
      .catch((error) => { throw (error); });
  };
}
