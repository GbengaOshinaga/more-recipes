import { sessionService } from 'redux-react-session';
import toastr from 'toastr';
import { SIGN_IN_SUCCESS, SIGN_UP_SUCCESS, SIGN_IN_FAILURE, SIGN_UP_FAILURE } from './actions';
import AccountsApi from '../api/AccountsApi';
/**
 * Updates reducer if sign in is successful
 * @param {*} response
 * @returns {Object} action
 */
export function updateSignInSuccess(response) {
  debugger;
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
    return AccountsApi.signIn(credentials)
      .then(response => response.json())
      .then((response) => {
        if (response.status === 'success') {
          sessionService.saveSession(response.data.token);
          sessionService.saveUser(response.data.user);
          dispatch(updateSignInSuccess(true));
        } else {
          dispatch(updateSignInFailure(false));
          toastr.error(response.data.message || response.data.errors);
        }
      })
      .catch((error) => { toastr.error(error); });
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
        if (response.status === 'success') {
          sessionService.saveSession(response.data.token);
          sessionService.saveUser(response.data.user);
        } else {
          throw (response.data.message || response.data.errors);
        }
      })
      .catch((error) => { throw (error); });
  };
}
