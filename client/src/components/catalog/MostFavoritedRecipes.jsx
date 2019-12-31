import React, { useEffect } from 'react';
import {
  useStoreContext,
  getMostFavorites,
  getIsFetchingMostFavorites
} from '../../hooks/globalStore';
import RecipesDisplay from '../common/RecipesDisplay';
import useActions from './useActions';

const MostFavoritedRecipes = () => {
  const { mostFavoritedRecipes, fetchMostFavoritedRecipes } = useStoreContext();
  const renderActions = useActions();

  const recipes = getMostFavorites(mostFavoritedRecipes);
  const isFetching = getIsFetchingMostFavorites(mostFavoritedRecipes);

  useEffect(() => {
    fetchMostFavoritedRecipes();
  }, [fetchMostFavoritedRecipes]);

  return (
    <RecipesDisplay
      isFetching={isFetching}
      recipes={recipes}
      renderActions={renderActions}
    />
  );
};

export default MostFavoritedRecipes;
