import { createStore, applyMiddleware } from 'redux';
// import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import rootReducer from '../reducers/index';

/**
 * Function to configure redux store
 * @param {*} initialState
 * @returns {*} store
 */
export default function configureStore(initialState) {
  return createStore(rootReducer, initialState);
}
