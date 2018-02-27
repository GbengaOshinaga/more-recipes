import 'babel-polyfill';
/**
 * class for signing in and signing up
 */
export default class AccountsApi {
  /**
     * Method for signing in
     * @param {object} credentials for signing in
     * @returns {object} response
     */
  static signIn(credentials) {
    return fetch('/api/v1/users/signin', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `email=${credentials.email}&password=${credentials.password}`
    });
  }

  /**
     * Method for signing up
     * @param {object} data for signing up
     * @returns {object} response
     */
  static signUp(data) {
    return fetch('/api/v1/users/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache'
      },
      body: `firstName=${data.firstName}&lastName=${data.lastName}&email=${data.email}&password=${data.password}&confirmPassword=${data.confirmPassword}&profilePic=${data.profilePic}`
    });
  }
}
