import React, { useEffect } from 'react';
import { getFavoritesIds, useStoreContext } from './globalStore';
import VoteAndFavActions from '../components/common/VoteAndFavActions';

export default function useActions() {
  const {
    userFavorites,
    getFavoritesIds: fetchFavoriteIds
  } = useStoreContext();

  const favoritesIds = getFavoritesIds(userFavorites);

  useEffect(() => {
    if (!favoritesIds.length) {
      fetchFavoriteIds();
    }
  }, [favoritesIds.length, fetchFavoriteIds]);

  /**
   * Renders vote and favorite actions
   * @param {Object} recipe
   *
   * @returns {JSX} VoteAndFavActions
   */
  const renderActions = recipe => {
    return <VoteAndFavActions recipe={recipe} favorites={favoritesIds} />;
  };

  return renderActions;
}
