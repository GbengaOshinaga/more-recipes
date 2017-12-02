import { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS } from './actions';
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
 * Sign up action
 * @param {*} response
 * @returns {Object} action
 */
export function updateSignUpSuccess(response) {
  return { type: SIGN_UP_SUCCESS, response };
}

/**
 * Signs in
 * @param {*} credentials
 * @returns {object} response
 */
export function signIn(credentials) {
  return function (dispatch) {
    return AccountsApi.signIn(credentials).then((response) => {
      console.log(JSON.stringify(response));
      dispatch(updateSignInSuccess(response));
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
    return AccountsApi.signUp(data).then((response) => {
      console.log(response.json());
      dispatch(updateSignUpSuccess(response));
    })
      .catch((error) => { throw (error); });
  };
}
