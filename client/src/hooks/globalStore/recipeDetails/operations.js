import { api, logger } from '../../../utils';

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
      logger('Recipe Details', response);
      saveRecipeDetails(response?.data?.recipe);
    } catch (error) {
      logger('Recipe Details Error', await error);
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
