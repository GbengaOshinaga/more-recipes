import fetch from './fetch';

const { API_URL } = process.env;
const USERS_BASE_URL = `${API_URL}/users`;
const RECIPES_BASE_URL = `${API_URL}/recipes`;

const api = {
  signIn: credentials => fetch.post(`${USERS_BASE_URL}/signin`, credentials),
  signUp: data => fetch.post(`${USERS_BASE_URL}/signup`, data),
  signOut: () => fetch.del(`${USERS_BASE_URL}/signOut`),
  getAllRecipes: nextUrl => fetch.get(nextUrl || `${RECIPES_BASE_URL}`),
  getMostFavoritedRecipes: () =>
    fetch.get(`${RECIPES_BASE_URL}/most_favourited`),
  upvoteRecipe: recipeId =>
    fetch.post(`${RECIPES_BASE_URL}/upvote/${recipeId}`),
  downvoteRecipe: recipeId =>
    fetch.post(`${RECIPES_BASE_URL}/downvote/${recipeId}`),
  favoriteRecipe: recipeId =>
    fetch.post(`${USERS_BASE_URL}/recipes/${recipeId}/favourites`),
  deleteFavorite: recipeId =>
    fetch.del(`${USERS_BASE_URL}/recipes/${recipeId}/favourites`),
  searchRecipes: (searchTerm, nextUrl) => {
    const url = nextUrl || `${RECIPES_BASE_URL}?query=${searchTerm}`;

    return fetch.get(url);
  },
  getRecipeDetails: recipeId => fetch.get(`${RECIPES_BASE_URL}/${recipeId}`)
};

export default api;
