import {
  SET_IS_FETCHING_USER_RECIPES,
  SAVE_USER_RECIPES,
  SET_IS_CREATING_RECIPE,
  SAVE_RECIPE
} from './actionCreators';

export const initialState = {
  isFetching: false,
  isCreatingRecipe: false,
  recipes: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_FETCHING_USER_RECIPES:
      return { ...state, isFetching: action.payload };
    case SET_IS_CREATING_RECIPE:
      return { ...state, isCreatingRecipe: action.payload };
    case SAVE_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case SAVE_USER_RECIPES:
      return { ...state, recipes: action.payload };
    default:
      return state;
  }
};

export default reducer;
