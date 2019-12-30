import { useReducer, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actionCreators';
import reducer, { initialState } from './reducers';
import operations from './operations';

export default function useGlobalStore() {
  const [{ allRecipes, mostFavoritedRecipes }, dispatch] = useReducer(
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
    favoriteRecipe
  } = useMemo(() => operations(actions), [actions]);

  return {
    // data
    allRecipes,
    mostFavoritedRecipes,
    // actions
    fetchRecipes,
    fetchMostFavoritedRecipes,
    upvoteRecipe,
    downvoteRecipe,
    favoriteRecipe
  };
}
