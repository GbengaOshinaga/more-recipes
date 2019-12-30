import cloneDeep from 'lodash/cloneDeep';
import { api, logger } from '../../../utils';
import { getUserId } from '../selectors';

const operations = actions => {
  const {
    saveRecipes,
    setIsFetching,
    updateUpvoteOptimistically,
    updateUpvoteRevert,
    updateDownvoteOptimistically,
    updateDownvoteRevert,
    updateFavoriteOptimistically,
    updateFavoriteRevert
  } = actions;
  const userId = getUserId();

  const fetchRecipes = async nextUrl => {
    !nextUrl && setIsFetching(true);
    try {
      const response = await api.getAllRecipes(nextUrl);
      logger('response', response);
      saveRecipes(response?.data);
    } catch (error) {
      logger('Fetch Recipes', error);
    } finally {
      !nextUrl && setIsFetching(false);
    }
  };

  const upvoteRecipe = async recipe => {
    const clonedRecipe = cloneDeep(recipe);
    updateUpvoteOptimistically(recipe.id, userId);
    try {
      await api.upvoteRecipe(recipe.id);
    } catch (error) {
      logger('Upvote', error);
      updateUpvoteRevert(clonedRecipe);
    }
  };

  const downvoteRecipe = async recipe => {
    const clonedRecipe = cloneDeep(recipe);
    updateDownvoteOptimistically(recipe.id, userId);
    try {
      await api.downvoteRecipe(recipe.id);
    } catch (error) {
      logger('Downvote', error);
      updateDownvoteRevert(clonedRecipe);
    }
  };

  const favoriteRecipe = async (recipeId, hasFavorited) => {
    updateFavoriteOptimistically(recipeId, hasFavorited);
    try {
      hasFavorited
        ? await api.deleteFavorite(recipeId)
        : await api.favoriteRecipe(recipeId);
    } catch (error) {
      logger('Favorite', error);
      updateFavoriteRevert(recipeId, !hasFavorited);
    }
  };

  return {
    fetchRecipes,
    upvoteRecipe,
    downvoteRecipe,
    favoriteRecipe
  };
};

export default operations;
