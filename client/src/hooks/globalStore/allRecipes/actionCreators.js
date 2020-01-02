import {
  UPDATE_UPVOTE_OPTIMISTICALLY,
  UPDATE_UPVOTE_REVERT,
  UPDATE_DOWNVOTE_OPTIMISTICALLY,
  UPDATE_DOWNVOTE_REVERT,
  UPDATE_FAVORITE_OPTIMISTICALLY,
  UPDATE_FAVORITE_REVERT
} from '../common/actionCreators';

export const SET_IS_FETCHING_RECIPES = 'SET_IS_FETCHING_RECIPES';
export const SAVE_RECIPES = 'SAVE_RECIPES';
export const SAVE_NEXT_RECIPES = 'SAVE_NEXT_RECIPES';

export const setIsFetching = isFetching => ({
  type: SET_IS_FETCHING_RECIPES,
  payload: isFetching
});

export const saveRecipes = recipes => ({
  type: SAVE_RECIPES,
  payload: recipes
});

export const saveNextRecipes = recipes => ({
  type: SAVE_NEXT_RECIPES,
  payload: recipes
});

export const updateUpvoteOptimistically = (recipeId, userId) => ({
  type: UPDATE_UPVOTE_OPTIMISTICALLY,
  payload: { recipeId, userId }
});

export const updateUpvoteRevert = recipe => ({
  type: UPDATE_UPVOTE_REVERT,
  payload: recipe
});

export const updateDownvoteOptimistically = (recipeId, userId) => ({
  type: UPDATE_DOWNVOTE_OPTIMISTICALLY,
  payload: { recipeId, userId }
});

export const updateDownvoteRevert = recipe => ({
  type: UPDATE_DOWNVOTE_REVERT,
  payload: recipe
});

export const updateFavoriteOptimistically = (recipeId, hasFavorited) => ({
  type: UPDATE_FAVORITE_OPTIMISTICALLY,
  payload: { recipeId, hasFavorited }
});

export const updateFavoriteRevert = (recipeId, hasFavorited) => ({
  type: UPDATE_FAVORITE_REVERT,
  payload: { recipeId, hasFavorited }
});
