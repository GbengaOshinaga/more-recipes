import React, { useEffect } from 'react';
import {
  useStoreContext,
  getRecipes,
  getIsFetchingRecipes,
  getRecipesPaginationMeta
} from '../../hooks/globalStore';
import RecipesDisplay from '../common/RecipesDisplay';
import useActions from './useActions';

const Recipes = () => {
  const { allRecipes, fetchRecipes, fetchNextRecipes } = useStoreContext();
  const renderActions = useActions();

  const recipes = getRecipes(allRecipes);
  const isFetching = getIsFetchingRecipes(allRecipes);
  const { next: nextUrl } = getRecipesPaginationMeta(allRecipes);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const fetchNext = () => {
    fetchNextRecipes(nextUrl);
  };

  return (
    <RecipesDisplay
      isFetching={isFetching}
      recipes={recipes}
      hasMore={!!nextUrl}
      fetchNext={fetchNext}
      renderActions={renderActions}
    />
  );
};

export default Recipes;
