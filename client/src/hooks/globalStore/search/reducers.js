import {
  SET_IS_SEARCHING,
  SAVE_RESULTS,
  SAVE_NEXT_RESULTS,
  CLEAR_RESULTS
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
  isSearching: false,
  recipes: [],
  paginationMeta: {}
};

const saveRecipes = (state, action) => {
  const {
    type,
    payload: { recipes = [], paginationMeta = {} }
  } = action;

  return {
    ...state,
    recipes:
      type === SAVE_NEXT_RESULTS ? [...state.recipes, ...recipes] : recipes,
    paginationMeta
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_SEARCHING:
      return { ...state, isSearching: action.payload };
    case SAVE_RESULTS:
      return saveRecipes(state, action);
    case SAVE_NEXT_RESULTS:
      return saveRecipes(state, action);
    case CLEAR_RESULTS:
      return initialState;
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
