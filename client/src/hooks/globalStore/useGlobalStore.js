import { useReducer, useMemo } from 'react';
import { bindActionCreators } from 'redux';
import * as actionCreators from './actionCreators';
import reducer, { initialState } from './reducers';
import operations from './operations';

export default function useGlobalStore() {
  const [
    {
      allRecipes,
      mostFavoritedRecipes,
      search,
      recipeDetails,
      reviews,
      userRecipes
    },
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
    fetchNextReviews,
    addReview,
    editReview,
    deleteReview,
    fetchUserRecipes
  } = useMemo(() => operations(actions), [actions]);

  return {
    // data
    allRecipes,
    mostFavoritedRecipes,
    search,
    recipeDetails,
    reviews,
    userRecipes,
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
    fetchNextReviews,
    addReview,
    editReview,
    deleteReview,
    fetchUserRecipes
  };
}
