import cloneDeep from 'lodash/cloneDeep';
import { log, logError } from '../../../utils';

const operations = (actions, api, userId) => {
  const {
    saveRecipes,
    setIsFetching,
    updateUpvoteOptimistically,
    updateUpvoteRevert,
    updateDownvoteOptimistically,
    updateDownvoteRevert,
    saveNextRecipes
  } = actions;

  const fetchRecipes = async () => {
    setIsFetching(true);
    try {
      const response = await api.getAllRecipes();
      log('response', response);
      saveRecipes(response?.data);
    } catch (error) {
      logError(error, 'Error in Fetch Recipes');
    } finally {
      setIsFetching(false);
    }
  };

  const fetchNextRecipes = async nextUrl => {
    try {
      const response = await api.getAllRecipes(nextUrl);
      log('next recipes response', response);
      saveNextRecipes(response?.data);
    } catch (error) {
      logError(error, 'Error in Fetch Next Recipes');
    }
  };

  const upvoteRecipe = async recipe => {
    const clonedRecipe = cloneDeep(recipe);
    updateUpvoteOptimistically(recipe.id, userId);
    try {
      await api.upvoteRecipe(recipe.id);
    } catch (error) {
      logError(await error, 'Upvote Error');
      updateUpvoteRevert(clonedRecipe);
    }
  };

  const downvoteRecipe = async recipe => {
    const clonedRecipe = cloneDeep(recipe);
    updateDownvoteOptimistically(recipe.id, userId);
    try {
      await api.downvoteRecipe(recipe.id);
    } catch (error) {
      logError(await error, 'Downvote Error');
      updateDownvoteRevert(clonedRecipe);
    }
  };

  return {
    fetchRecipes,
    fetchNextRecipes,
    upvoteRecipe,
    downvoteRecipe
  };
};

export default operations;
