import React, { useEffect } from 'react';
import {
  useStoreContext,
  getMostFavorites,
  getIsFetchingMostFavorites
} from '../../hooks/globalStore';
import useActions from '../../hooks/useActions';
import RecipesDisplay from '../common/RecipesDisplay';

const MostFavoritedRecipes = () => {
  const { mostFavoritedRecipes, fetchMostFavoritedRecipes } = useStoreContext();
  const renderActions = useActions();

  const recipes = getMostFavorites(mostFavoritedRecipes);
  const isFetching = getIsFetchingMostFavorites(mostFavoritedRecipes);

  useEffect(() => {
    if (!recipes.length) {
      fetchMostFavoritedRecipes();
    }
  }, [fetchMostFavoritedRecipes, recipes.length]);

  return (
    <RecipesDisplay
      isFetching={isFetching}
      recipes={recipes}
      renderActions={renderActions}
    />
  );
};

export default MostFavoritedRecipes;
