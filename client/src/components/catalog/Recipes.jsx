import React, { useEffect } from 'react';
import {
  useStoreContext,
  getRecipes,
  getIsFetchingRecipes,
  getRecipesPaginationMeta
} from '../../hooks/globalStore';
import useActions from '../../hooks/useActions';
import RecipesDisplay from '../common/RecipesDisplay';

const Recipes = () => {
  const { allRecipes, fetchRecipes, fetchNextRecipes } = useStoreContext();
  const renderActions = useActions();

  const recipes = getRecipes(allRecipes);
  const isFetching = getIsFetchingRecipes(allRecipes);
  const { next: nextUrl } = getRecipesPaginationMeta(allRecipes);

  useEffect(() => {
    if (!recipes.length) {
      fetchRecipes();
    }
  }, [fetchRecipes, recipes.length]);

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
