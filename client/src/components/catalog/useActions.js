import React from 'react';
import { useStoreContext, getFavouritesIds } from '../../hooks/globalStore';
import VoteAndFavActions from '../common/VoteAndFavActions';

export default function useActions() {
  const { allRecipes } = useStoreContext();

  const favoritesIds = getFavouritesIds(allRecipes);

  const renderActions = recipe => {
    return <VoteAndFavActions recipe={recipe} favorites={favoritesIds} />;
  };

  return renderActions;
}
