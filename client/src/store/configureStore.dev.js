import { createStore, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers/index';

/**
 * Function to configure redux store
 * @param {*} initialState
 * @returns {*} store
 */
export default function configureStore(initialState) {
  const logger = createLogger();

  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, logger, reduxImmutableStateInvariant())
  );
}
