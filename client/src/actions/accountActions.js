import AccountsApi from '../api/AccountsApi';

/**
 * Signs in
 * @param {Object} credentials
 * @returns {object} response
 */
export function signIn(credentials) {
  return AccountsApi.signIn(credentials);
}

/**
 * Sign up
 * @param {Object} data
 * @returns {function} function
 */
export function signUp(data) {
  return AccountsApi.signUp(data);
}
