export const SET_IS_FETCHING_USER_RECIPES = 'SET_IS_FETCHING_USER_RECIPES';
export const SAVE_USER_RECIPES = 'SAVE_USER_RECIPES';
export const SET_IS_CREATING_RECIPE = 'SET_IS_CREATING_RECIPE';
export const SAVE_RECIPE = 'SAVE_RECIPE';

export const setIsFetchingUserRecipes = isFetching => ({
  type: SET_IS_FETCHING_USER_RECIPES,
  payload: isFetching
});

export const saveUserRecipes = recipes => ({
  type: SAVE_USER_RECIPES,
  payload: recipes
});

export const setIsCreatingRecipe = isCreatingRecipe => ({
  type: SET_IS_CREATING_RECIPE,
  payload: isCreatingRecipe
});

export const saveRecipe = recipe => ({
  type: SAVE_RECIPE,
  payload: recipe
});
