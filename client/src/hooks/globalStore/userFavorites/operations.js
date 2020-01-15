import { api, log, logError } from '../../../utils';

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
      log('Get Favorites', response);
      saveFavorites(response?.data?.favourites);
    } catch (error) {
      logError(await error, 'Get Favorites error');
    } finally {
      setIsFetchingFavorites(false);
    }
  };

  const getFavoritesIds = async () => {
    try {
      const response = await api.getFavoritesIds();
      saveFavoriteIds(response?.data?.favoritesId);
    } catch (error) {
      logError(await error, 'Get Favorites Ids error');
    }
  };

  const favoriteRecipe = async (recipeId, hasFavorited) => {
    updateFavoriteOptimistically(recipeId, hasFavorited);
    try {
      hasFavorited
        ? await api.deleteFavorite(recipeId)
        : await api.favoriteRecipe(recipeId);
    } catch (error) {
      logError(await error, 'Favorite Recipe Error');
      updateFavoriteRevert(recipeId, !hasFavorited);
    }
  };

  return { getUserFavorites, getFavoritesIds, favoriteRecipe };
};

export default operations;
