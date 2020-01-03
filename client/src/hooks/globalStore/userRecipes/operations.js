import { api, logger } from '../../../utils';

const operations = actions => {
  const { setIsFetchingUserRecipes, saveUserRecipes } = actions;

  const fetchUserRecipes = async () => {
    setIsFetchingUserRecipes(true);
    try {
      const response = await api.getUserRecipes();
      logger('User Recipes', response);
      saveUserRecipes(response?.data?.recipes);
    } catch (error) {
      logger('User Recipes Error', await error);
    } finally {
      setIsFetchingUserRecipes(false);
    }
  };

  return {
    fetchUserRecipes
  };
};

export default operations;
