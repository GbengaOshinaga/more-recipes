import {
  SET_IS_FETCHING_USER_RECIPES,
  SAVE_USER_RECIPES,
  SET_IS_LOADING,
  SAVE_RECIPE,
  DELETE_RECIPE_OPTIMISTICALLY,
  DELETE_RECIPE_REVERT,
  EDIT_RECIPE
} from './actionCreators';

export const initialState = {
  isFetching: false,
  isLoading: false,
  recipes: []
};

const cache = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_FETCHING_USER_RECIPES:
      return { ...state, isFetching: action.payload };
    case SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case SAVE_RECIPE:
      return { ...state, recipes: [...state.recipes, action.payload] };
    case EDIT_RECIPE: {
      const { payload: recipe } = action;

      return {
        ...state,
        recipes: state.recipes.map(stateRecipe => {
          if (stateRecipe.id === recipe.id) {
            return recipe;
          }
          return stateRecipe;
        })
      };
    }
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
