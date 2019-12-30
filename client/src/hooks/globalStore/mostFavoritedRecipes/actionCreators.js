export const SET_IS_FETCHING_MOST_FAVORITES = 'SET_IS_FETCHING_MOST_FAVORITES';
export const SAVE_MOST_FAVORITES = 'SAVE_MOST_FAVORITES';

export const setIsFetchingMostFav = isFetching => ({
  type: SET_IS_FETCHING_MOST_FAVORITES,
  payload: isFetching
});

export const saveMostFavorites = mostFavorites => ({
  type: SAVE_MOST_FAVORITES,
  payload: mostFavorites
});
