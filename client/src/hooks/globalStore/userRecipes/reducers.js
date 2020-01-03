import {
  SET_IS_FETCHING_USER_RECIPES,
  SAVE_USER_RECIPES
} from './actionCreators';

export const initialState = {
  isFetching: false,
  recipes: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_FETCHING_USER_RECIPES:
      return { ...state, isFetching: action.payload };
    case SAVE_USER_RECIPES:
      return { ...state, recipes: action.payload };
    default:
      return state;
  }
};

export default reducer;
