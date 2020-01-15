import { api, log, logError } from '../../../utils';

const operations = actions => {
  const {
    setIsFetchingRecipeDetails,
    saveRecipeDetails,
    setNotFound
  } = actions;

  const fetchRecipeDetails = async recipeId => {
    setIsFetchingRecipeDetails(true);
    try {
      const response = await api.getRecipeDetails(recipeId);
      log('Recipe Details', response);
      saveRecipeDetails(response?.data?.recipe);
    } catch (error) {
      logError(await error, 'Recipe Details Error');
      setNotFound();
    } finally {
      setIsFetchingRecipeDetails(false);
    }
  };

  return {
    fetchRecipeDetails
  };
};

export default operations;
