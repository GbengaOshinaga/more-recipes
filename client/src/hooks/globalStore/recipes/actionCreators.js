export const SAVE_RECIPES = 'SAVE_RECIPES';

export const saveRecipes = recipes => ({
  type: SAVE_RECIPES,
  payload: recipes
});
