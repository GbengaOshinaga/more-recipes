import {
  SET_IS_FETCHING_FAVORITES,
  SAVE_FAVORITES,
  SAVE_FAVORITE_IDS,
  UPDATE_FAVORITE_OPTIMISTICALLY,
  UPDATE_FAVORITE_REVERT
} from './actionCreators';
import {
  UPDATE_UPVOTE_OPTIMISTICALLY,
  UPDATE_UPVOTE_REVERT,
  UPDATE_DOWNVOTE_OPTIMISTICALLY,
  UPDATE_DOWNVOTE_REVERT
} from '../common/actionCreators';
import {
  downvoteRecipe,
  upvoteRecipe,
  revertVoteState
} from '../common/reducerUtils';

export const initialState = {
  isFetching: false,
  recipes: [],
  favoritesIds: []
};

const cache = {};

export const updateFavoriteState = (state, action) => {
  const {
    payload: { recipeId, hasFavorited }
  } = action;
  if (hasFavorited) {
    const recipe = state.recipes.find(
      stateRecipe => stateRecipe.id === recipeId
    );
    cache[recipeId] = recipe;

    return {
      ...state,
      recipes: state.recipes.filter(stateRecipe => stateRecipe.id !== recipeId),
      favoritesIds: state.favoritesIds.filter(
        favorite => favorite.id !== recipeId
      )
    };
  }

  return {
    ...state,
    favoritesIds: state.favoritesIds.concat({ id: recipeId }),
    ...(cache[recipeId] ? { recipes: [...state.recipes, cache[recipeId]] } : {})
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_FETCHING_FAVORITES:
      return { ...state, isFetching: action.payload };
    case SAVE_FAVORITES:
      return { ...state, recipes: action.payload };
    case SAVE_FAVORITE_IDS:
      return { ...state, favoritesIds: action.payload };
    case UPDATE_FAVORITE_OPTIMISTICALLY: {
      return updateFavoriteState(state, action);
    }
    case UPDATE_FAVORITE_REVERT:
      return updateFavoriteState(state, action);
    case UPDATE_UPVOTE_OPTIMISTICALLY:
      return upvoteRecipe(state, action);
    case UPDATE_DOWNVOTE_OPTIMISTICALLY:
      return downvoteRecipe(state, action);
    case UPDATE_UPVOTE_REVERT:
    case UPDATE_DOWNVOTE_REVERT:
      return revertVoteState(state, action);
    default:
      return state;
  }
};

export default reducer;
