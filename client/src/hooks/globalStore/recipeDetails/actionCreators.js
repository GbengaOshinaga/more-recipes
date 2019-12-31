export const SET_IS_FETCHING = 'SET_IS_FETCHING';
export const SAVE_RECIPE_DETAILS = 'SAVE_RECIPE_DETAILS';

export const setIsFetchingRecipeDetails = isFetching => ({
  type: SET_IS_FETCHING,
  payload: isFetching
});

export const saveRecipeDetails = recipeDetails => ({
  type: SAVE_RECIPE_DETAILS,
  payload: recipeDetails
});
