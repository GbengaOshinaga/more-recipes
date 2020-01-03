export const SET_IS_FETCHING_USER_RECIPES = 'SET_IS_FETCHING_USER_RECIPES';
export const SAVE_USER_RECIPES = 'SAVE_USER_RECIPES';

export const setIsFetchingUserRecipes = isFetching => ({
  type: SET_IS_FETCHING_USER_RECIPES,
  payload: isFetching
});

export const saveUserRecipes = recipes => ({
  type: SAVE_USER_RECIPES,
  payload: recipes
});
