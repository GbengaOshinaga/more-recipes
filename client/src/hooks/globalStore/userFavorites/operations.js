import { api, logger } from '../../../utils';

const operations = actions => {
  const {
    setIsFetchingFavorites,
    saveFavorites,
    saveFavoriteIds,
    updateFavoriteOptimistically,
    updateFavoriteRevert
  } = actions;

  const getUserFavorites = async () => {
    setIsFetchingFavorites(true);
    try {
      const response = await api.getUserFavorites();
      logger('Get Favorites', response);
      saveFavorites(response?.data?.favourites);
    } catch (error) {
      logger('Get Favorites error', await error);
    } finally {
      setIsFetchingFavorites(false);
    }
  };

  const getFavoritesIds = async () => {
    try {
      const response = await api.getFavoritesIds();
      saveFavoriteIds(response?.data?.favoritesId);
    } catch (error) {
      logger('Get Favorites Ids error', await error);
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

  return { getUserFavorites, getFavoritesIds, favoriteRecipe };
};

export default operations;
