import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
import account from './accountReducer';

const rootReducer = combineReducers({
  account,
  session: sessionReducer
});

export default rootReducer;
