export const SET_IS_SEARCHING = 'SET_IS_SEARCHING';
export const SAVE_RESULTS = 'SAVE_RESULTS';
export const SAVE_NEXT_RESULTS = 'SAVE_NEXT_RESULTS';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';

export const setIsSearching = isSearching => ({
  type: SET_IS_SEARCHING,
  payload: isSearching
});

export const saveResults = results => ({
  type: SAVE_RESULTS,
  payload: results
});

export const saveNextResults = results => ({
  type: SAVE_NEXT_RESULTS,
  payload: results
});

export const clearResults = () => ({
  type: CLEAR_RESULTS
});
