import { combineReducers } from 'redux';
import recipes, {
  initialState as recipesInitialState
} from './recipes/reducers';

export default combineReducers({ recipes });

export const initialState = {
  recipes: recipesInitialState
};
