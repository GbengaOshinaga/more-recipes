import { api, logger } from '../../../utils';

const operations = actions => {
  const { setIsFetchingMostFav, saveMostFavorites } = actions;

  const fetchMostFavoritedRecipes = async () => {
    setIsFetchingMostFav(true);
    try {
      const response = await api.getMostFavoritedRecipes();
      saveMostFavorites(response?.data);
    } catch (error) {
      logger('Most Fav Fetch', error);
    } finally {
      setIsFetchingMostFav(false);
    }
  };

  return {
    fetchMostFavoritedRecipes
  };
};

export default operations;
