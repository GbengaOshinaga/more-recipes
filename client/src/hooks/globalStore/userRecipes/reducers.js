import {
  SET_IS_FETCHING_USER_RECIPES,
  SAVE_USER_RECIPES,
  SET_IS_CREATING_RECIPE,
  SAVE_RECIPE,
  DELETE_RECIPE_OPTIMISTICALLY,
  DELETE_RECIPE_REVERT
} from './actionCreators';

export const initialState = {
  isFetching: false,
  isCreatingRecipe: false,
  recipes: []
};

const cache = {};

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
    case DELETE_RECIPE_OPTIMISTICALLY: {
      const { payload: recipeId } = action;

      const recipe = state.recipes.find(r => r.id === recipeId);
      cache[recipe.id] = recipe;

      return {
        ...state,
        recipes: state.recipes.filter(
          stateRecipe => stateRecipe.id !== recipeId
        )
      };
    }
    case DELETE_RECIPE_REVERT: {
      const { payload: recipeId } = action;

      if (cache[recipeId]) {
        return { ...state, recipes: [...state.recipes, cache[recipeId]] };
      }
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
