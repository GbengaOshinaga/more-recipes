/**
 * Account Reducer function
 * @param {*} state
 * @param {*} action
 * @returns {Object} new state
 */
export default function accountReducer(state = [], action) {
  switch (action.type) {
    case 'SIGN_IN':
      return [...state, Object.assign({}, action.credentials)];
    default:
      return state;
  }
}
