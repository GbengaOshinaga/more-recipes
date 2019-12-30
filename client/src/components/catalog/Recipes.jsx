import React, { useEffect } from 'react';
import {
  useStoreContext,
  getRecipes,
  getFavouritesIds,
  getIsFetchingRecipes,
  getRecipesPaginationMeta
} from '../../hooks/globalStore';
import RecipesDisplay from '../common/RecipesDisplay';
import VoteAndFavActions from '../common/VoteAndFavActions';

const Recipes = () => {
  const { allRecipes, fetchRecipes } = useStoreContext();

  const recipes = getRecipes(allRecipes);
  const favoritesIds = getFavouritesIds(allRecipes);
  const isFetching = getIsFetchingRecipes(allRecipes);
  const { next: nextUrl } = getRecipesPaginationMeta(allRecipes);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const fetchNextRecipes = () => {
    fetchRecipes(nextUrl);
  };

  const renderActions = recipe => {
    return <VoteAndFavActions recipe={recipe} favorites={favoritesIds} />;
  };

  return (
    <RecipesDisplay
      isFetching={isFetching}
      recipes={recipes}
      hasMore={!!nextUrl}
      fetchNext={fetchNextRecipes}
      renderActions={renderActions}
    />
  );
};

export default Recipes;
