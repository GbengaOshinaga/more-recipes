import cloneDeep from 'lodash/cloneDeep';

/**
 * Update upvotes or downvotes state
 * @param {Object} state
 * @param {Object} action
 * @param {String} activeVoteKey - key (either upvotes or downvotes) that
 * is being currently updated
 * @param {String} inActiveVoteKey - key that is not being currently updated
 *
 * @returns {Object} updated state
 */
const updateVoteState = ({ state, action, activeVoteKey, inActiveVoteKey }) => {
  const {
    payload: { recipeId, userId }
  } = action;
  const { recipes } = state;

  const recipe = recipes?.find(item => item.id === recipeId);
  if (!recipe) {
    return state;
  }
  const clonedRecipe = cloneDeep(recipe);
  const activeVotes = clonedRecipe[activeVoteKey];
  const inActiveVotes = clonedRecipe[inActiveVoteKey];

  if (!activeVotes?.includes(userId)) {
    clonedRecipe[activeVoteKey].push(userId);

    if (inActiveVotes?.includes(userId)) {
      // If active vote, let's say upvotes for example, has been updated,
      // we should check if downvotes also needs to be updated, as a user
      // can't have both upvote and downvote
      const voteIndex = inActiveVotes.findIndex(item => item === userId);
      clonedRecipe[inActiveVoteKey].splice(voteIndex, 1);
    }
  } else {
    const voteIndex = activeVotes.findIndex(item => item === userId);
    clonedRecipe[activeVoteKey].splice(voteIndex, 1);
  }

  return {
    ...state,
    recipes: state.recipes.map(stateRecipe => {
      if (stateRecipe.id === recipe.id) {
        return { ...stateRecipe, ...clonedRecipe };
      }
      return stateRecipe;
    })
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

export const revertVoteState = (state, action) => {
  return {
    ...state,
    recipes: state.recipes.map(stateRecipe => {
      const { payload = {} } = action;

      if (stateRecipe.id === payload.id) {
        return { ...stateRecipe, ...payload };
      }
      return stateRecipe;
    })
  };
};

export const updateFavoriteState = (state, action) => {
  const {
    payload: { recipeId, hasFavorited }
  } = action;
  if (hasFavorited) {
    return {
      ...state,
      favourites: state.favourites.filter(favorite => favorite.id !== recipeId)
    };
  }

  return {
    ...state,
    favourites: state.favourites.concat({ id: recipeId })
  };
};
