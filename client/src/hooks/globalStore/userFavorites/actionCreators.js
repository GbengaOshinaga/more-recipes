export const SET_IS_FETCHING_FAVORITES = 'SET_IS_FETCHING_FAVORITES';
export const SAVE_FAVORITES = 'SAVE_FAVORITES';
export const SAVE_FAVORITE_IDS = 'SAVE_FAVORITE_IDS';
export const UPDATE_FAVORITE_OPTIMISTICALLY = 'UPDATE_FAVORITE_OPTIMISTICALLY';
export const UPDATE_FAVORITE_REVERT = 'UPDATE_FAVORITE_REVERT';

export const setIsFetchingFavorites = isFetching => ({
  type: SET_IS_FETCHING_FAVORITES,
  payload: isFetching
});

export const saveFavorites = favorites => ({
  type: SAVE_FAVORITES,
  payload: favorites
});

export const saveFavoriteIds = favoriteIds => ({
  type: SAVE_FAVORITE_IDS,
  payload: favoriteIds
});

export const updateFavoriteOptimistically = (recipeId, hasFavorited) => ({
  type: UPDATE_FAVORITE_OPTIMISTICALLY,
  payload: { recipeId, hasFavorited }
});

export const updateFavoriteRevert = (recipeId, hasFavorited) => ({
  type: UPDATE_FAVORITE_REVERT,
  payload: { recipeId, hasFavorited }
});
