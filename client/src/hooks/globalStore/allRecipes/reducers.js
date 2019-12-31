import {
  SET_IS_FETCHING_RECIPES,
  SAVE_RECIPES,
  SAVE_NEXT_RECIPES
} from './actionCreators';
import {
  UPDATE_UPVOTE_OPTIMISTICALLY,
  UPDATE_UPVOTE_REVERT,
  UPDATE_DOWNVOTE_OPTIMISTICALLY,
  UPDATE_DOWNVOTE_REVERT,
  UPDATE_FAVORITE_OPTIMISTICALLY,
  UPDATE_FAVORITE_REVERT
} from '../common/actionCreators';
import {
  downvoteRecipe,
  upvoteRecipe,
  updateFavoriteState,
  revertVoteState
} from '../common/reducerUtils';

export const initialState = {
  isFetching: false,
  recipes: [],
  paginationMeta: {}
};

const saveRecipes = (state, action) => {
  const {
    type,
    payload: { recipes, paginationMeta, favourites = [] }
  } = action;

  return {
    ...state,
    recipes:
      type === SAVE_NEXT_RECIPES ? [...state.recipes, ...recipes] : recipes,
    paginationMeta,
    favourites
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_FETCHING_RECIPES:
      return { ...state, isFetching: action.payload };
    case SAVE_RECIPES:
    case SAVE_NEXT_RECIPES:
      return saveRecipes(state, action);
    case UPDATE_FAVORITE_OPTIMISTICALLY:
      return updateFavoriteState(state, action);
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
