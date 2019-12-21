import { api, logger } from '../../../utils';

const operations = actions => {
  const { saveRecipes } = actions;

  const fetchRecipes = async nextUrl => {
    try {
      const response = await api.getAllRecipes(nextUrl);
      saveRecipes(response);
    } catch (error) {
      logger('Fetch Recipes', error);
    }
  };

  return { fetchRecipes };
};

export default operations;
