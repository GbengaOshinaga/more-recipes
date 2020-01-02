import { useReducer, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actionCreators';
import reducer, { initialState } from './reducers';
import operations from './operations';

export default function useGlobalStore() {
  const [
    { allRecipes, mostFavoritedRecipes, search, recipeDetails, reviews },
    dispatch
  ] = useReducer(reducer, initialState);

  const actions = useMemo(() => bindActionCreators(actionCreators, dispatch), [
    dispatch
  ]);

  const {
    fetchRecipes,
    fetchNextRecipes,
    fetchMostFavoritedRecipes,
    upvoteRecipe,
    downvoteRecipe,
    favoriteRecipe,
    searchRecipes,
    getNextSearchResults,
    fetchRecipeDetails,
    fetchReviews,
    addReview,
    editReview,
    deleteReview
  } = useMemo(() => operations(actions), [actions]);

  return {
    // data
    allRecipes,
    mostFavoritedRecipes,
    search,
    recipeDetails,
    reviews,
    // actions
    fetchRecipes,
    fetchNextRecipes,
    fetchMostFavoritedRecipes,
    upvoteRecipe,
    downvoteRecipe,
    favoriteRecipe,
    searchRecipes,
    getNextSearchResults,
    fetchRecipeDetails,
    fetchReviews,
    addReview,
    editReview,
    deleteReview
  };
}