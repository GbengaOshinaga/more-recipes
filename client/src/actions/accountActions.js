import api from './Fetch';

/**
 * Signs in
 * @param {Object} credentials
 * @returns {object} response
 */
export function signIn(credentials) {
  return api.post('/api/v1/users/signin', credentials);
}

/**
 * Sign up
 * @param {Object} data
 * @returns {function} function
 */
export function signUp(data) {
  return api.post('/api/v1/users/signup', data);
}
