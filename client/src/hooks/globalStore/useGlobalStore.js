import { useReducer, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actionCreators';
import reducer, { initialState } from './reducers';
import operations from './operations';

export default function useGlobalStore() {
  const [
    { allRecipes, mostFavoritedRecipes, search, recipeDetails },
    dispatch
  ] = useReducer(reducer, initialState);

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
    getNextSearchResults,
    fetchRecipeDetails
  } = useMemo(() => operations(actions), [actions]);

  return {
    // data
    allRecipes,
    mostFavoritedRecipes,
    search,
    recipeDetails,
    // actions
    fetchRecipes,
    fetchMostFavoritedRecipes,
    upvoteRecipe,
    downvoteRecipe,
    favoriteRecipe,
    searchRecipes,
    getNextSearchResults,
    fetchRecipeDetails
  };
}
