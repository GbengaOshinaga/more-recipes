import {
  SET_IS_FETCHING_MOST_FAVORITES,
  SAVE_MOST_FAVORITES
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
  recipes: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_FETCHING_MOST_FAVORITES:
      return { ...state, isFetching: action.payload };
    case SAVE_MOST_FAVORITES:
      return { ...state, recipes: action.payload?.recipes };
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
