import { useReducer, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actionCreators';
import reducer, { initialState } from './reducers';
import operations from './operations';

export default function useGlobalStore() {
  const [{ allRecipes, mostFavoritedRecipes, search }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const actions = useMemo(() => bindActionCreators(actionCreators, dispatch), [
    dispatch
  ]);

  const {
    fetchRecipes,
    fetchMostFavoritedRecipes,
    upvoteRecipe,
    downvoteRecipe,
    favoriteRecipe,
    searchRecipes,
    getNextSearchResults
  } = useMemo(() => operations(actions), [actions]);

  return {
    // data
    allRecipes,
    mostFavoritedRecipes,
    search,
    // actions
    fetchRecipes,
    fetchMostFavoritedRecipes,
    upvoteRecipe,
    downvoteRecipe,
    favoriteRecipe,
    searchRecipes,
    getNextSearchResults
  };
}
