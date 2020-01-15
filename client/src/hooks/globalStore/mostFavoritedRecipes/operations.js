import { api, log, logError } from '../../../utils';

const operations = actions => {
  const { setIsFetchingMostFav, saveMostFavorites } = actions;

  const fetchMostFavoritedRecipes = async () => {
    setIsFetchingMostFav(true);
    try {
      const response = await api.getMostFavoritedRecipes();
      log('Most Fav Response', response);
      saveMostFavorites(response?.data);
    } catch (error) {
      logError(await error, 'Error in Fetch Most Favorited Recipes');
    } finally {
      setIsFetchingMostFav(false);
    }
  };

  return {
    fetchMostFavoritedRecipes
  };
};

export default operations;
