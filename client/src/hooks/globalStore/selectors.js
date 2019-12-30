const emptyObj = {};
const emptyArr = [];

const getItemFromStorage = key => window.localStorage.getItem(key);

export const getIsFetchingRecipes = allRecipes =>
  allRecipes?.isFetching ?? false;

export const getIsFetchingMostFavorites = mostFavoritedRecipes =>
  mostFavoritedRecipes?.isFetching ?? false;

export const getRecipes = allRecipes => allRecipes?.recipes ?? emptyArr;

export const getMostFavorites = mostFavoritedRecipes => {
  return mostFavoritedRecipes?.recipes ?? [];
};

export const getRecipesPaginationMeta = allRecipes =>
  allRecipes?.paginationMeta ?? emptyObj;

export const getFavouritesIds = allRecipes =>
  allRecipes?.favourites ?? emptyArr;

export const getIsUserAuthenticated = () =>
  Boolean(getItemFromStorage('isAuthenticated'));

export const getUserId = () => Number(getItemFromStorage('userId')) || 0;

export const getHasUserVoted = recipe => {
  const userId = getUserId();
  const data = { hasUpvoted: false, hasDownvoted: false };
  const { upvotes, downvotes } = recipe;

  if (upvotes?.includes(userId)) {
    data.hasUpvoted = true;
  } else if (downvotes?.includes(userId)) {
    data.hasDownvoted = true;
  }

  return data;
};

export const getHasUserFavorited = (recipeId, favorites) => {
  const ids = favorites.map(favourite => favourite.id);
  return ids.includes(recipeId);
};
