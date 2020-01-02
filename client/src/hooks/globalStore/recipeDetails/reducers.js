import {
  SET_IS_FETCHING,
  SAVE_RECIPE_DETAILS,
  SET_NOT_FOUND
} from './actionCreators';
import {
  UPDATE_UPVOTE_OPTIMISTICALLY,
  UPDATE_UPVOTE_REVERT,
  UPDATE_DOWNVOTE_OPTIMISTICALLY,
  UPDATE_DOWNVOTE_REVERT
} from '../common/actionCreators';

export const initialState = {
  isFetching: false,
  recipeDetails: {},
  notFound: false
};

const updateVoteState = ({ state, action, activeVoteKey, inActiveVoteKey }) => {
  const {
    payload: { userId }
  } = action;
  const { recipeDetails } = state;

  if (!Object.keys(recipeDetails).length) {
    return state;
  }

  const updatedRecipeDetails = { ...recipeDetails };
  const activeVotes = updatedRecipeDetails[activeVoteKey];
  const inActiveVotes = updatedRecipeDetails[inActiveVoteKey];

  if (!activeVotes?.includes(userId)) {
    updatedRecipeDetails[activeVoteKey].push(userId);

    if (inActiveVotes?.includes(userId)) {
      // If active vote, let's say upvotes for example, has been updated,
      // we should check if downvotes also needs to be updated, as a user
      // can't have both upvote and downvote
      const voteIndex = inActiveVotes.findIndex(item => item === userId);
      updatedRecipeDetails[inActiveVoteKey].splice(voteIndex, 1);
    }
  } else {
    const voteIndex = activeVotes.findIndex(item => item === userId);
    updatedRecipeDetails[activeVoteKey].splice(voteIndex, 1);
  }

  return {
    ...state,
    recipeDetails: { ...recipeDetails, ...updatedRecipeDetails }
  };
};

export const upvoteRecipe = (state, action) => {
  return updateVoteState({
    state,
    action,
    activeVoteKey: 'upvotes',
    inActiveVoteKey: 'downvotes'
  });
};

export const downvoteRecipe = (state, action) => {
  return updateVoteState({
    state,
    action,
    activeVoteKey: 'downvotes',
    inActiveVoteKey: 'upvotes'
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_IS_FETCHING:
      return { ...state, isFetching: action.payload };
    case SAVE_RECIPE_DETAILS:
      return { ...state, recipeDetails: action.payload, notFound: false };
    case SET_NOT_FOUND:
      return { ...state, notFound: true };
    case UPDATE_UPVOTE_OPTIMISTICALLY:
      return upvoteRecipe(state, action);
    case UPDATE_DOWNVOTE_OPTIMISTICALLY:
      return downvoteRecipe(state, action);
    case UPDATE_UPVOTE_REVERT:
    case UPDATE_DOWNVOTE_REVERT:
      return { ...state, recipeDetails: action.payload };
    default:
      return state;
  }
};

export default reducer;
