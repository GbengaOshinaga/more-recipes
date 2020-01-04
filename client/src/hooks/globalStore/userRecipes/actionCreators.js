export const SET_IS_FETCHING_USER_RECIPES = 'SET_IS_FETCHING_USER_RECIPES';
export const SAVE_USER_RECIPES = 'SAVE_USER_RECIPES';
export const SET_IS_LOADING = 'SET_IS_LOADING';
export const SAVE_RECIPE = 'SAVE_RECIPE';
export const DELETE_RECIPE_OPTIMISTICALLY = 'DELETE_RECIPE_OPTIMISTICALLY';
export const DELETE_RECIPE_REVERT = 'DELETE_RECIPE_REVERT';
export const EDIT_RECIPE = 'EDIT_RECIPE';

export const setIsFetchingUserRecipes = isFetching => ({
  type: SET_IS_FETCHING_USER_RECIPES,
  payload: isFetching
});

export const saveUserRecipes = recipes => ({
  type: SAVE_USER_RECIPES,
  payload: recipes
});

export const setIsLoading = isCreatingRecipe => ({
  type: SET_IS_LOADING,
  payload: isCreatingRecipe
});

export const saveRecipe = recipe => ({
  type: SAVE_RECIPE,
  payload: recipe
});

export const deleteRecipeOptimistically = recipeId => ({
  type: DELETE_RECIPE_OPTIMISTICALLY,
  payload: recipeId
});

export const deleteRecipeRevert = recipeId => ({
  type: DELETE_RECIPE_REVERT,
  payload: recipeId
});

export const editRecipe = recipe => ({
  type: EDIT_RECIPE,
  payload: recipe
});
