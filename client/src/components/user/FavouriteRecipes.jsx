import React, { useEffect } from 'react';
import {
  useStoreContext,
  getIsFetchingUserFavorites,
  getFavorites
} from '../../hooks/globalStore';
import useActions from '../../hooks/useActions';
import NavBar from '../common/NavBar';
import RecipesDisplay from '../common/RecipesDisplay';

const FavoriteRecipes = () => {
  const { userFavorites, getUserFavorites } = useStoreContext();
  const renderActions = useActions();

  const isFetching = getIsFetchingUserFavorites(userFavorites);
  const recipes = getFavorites(userFavorites);

  useEffect(() => {
    getUserFavorites();
  }, [getUserFavorites]);

  return (
    <div>
      <NavBar />
      <RecipesDisplay
        isFetching={isFetching}
        recipes={recipes}
        renderActions={renderActions}
      />
    </div>
  );
};

export default FavoriteRecipes;
