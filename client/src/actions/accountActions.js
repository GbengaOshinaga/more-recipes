/**
 * Sign in action
 * @param {*} credentials
 * @returns {Object} action
 */
export function signIn(credentials) {
    return { type: 'SIGN_IN', credentials };
}
