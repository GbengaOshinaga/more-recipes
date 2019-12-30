import React, { useEffect } from 'react';
import {
  useStoreContext,
  getMostFavorites,
  getFavouritesIds,
  getIsFetchingMostFavorites
} from '../../hooks/globalStore';
import RecipesDisplay from '../common/RecipesDisplay';
import VoteAndFavActions from '../common/VoteAndFavActions';

const MostFavoritedRecipes = () => {
  const {
    allRecipes,
    mostFavoritedRecipes,
    fetchMostFavoritedRecipes
  } = useStoreContext();

  const recipes = getMostFavorites(mostFavoritedRecipes);
  const favoritesIds = getFavouritesIds(allRecipes);
  const isFetching = getIsFetchingMostFavorites(mostFavoritedRecipes);

  useEffect(() => {
    fetchMostFavoritedRecipes();
  }, [fetchMostFavoritedRecipes]);

  const renderActions = recipe => {
    return <VoteAndFavActions recipe={recipe} favorites={favoritesIds} />;
  };

  return (
    <RecipesDisplay
      isFetching={isFetching}
      recipes={recipes}
      renderActions={renderActions}
    />
  );
};

export default MostFavoritedRecipes;
