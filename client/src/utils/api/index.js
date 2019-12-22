import fetch from './fetch';

const { API_URL } = process.env;

const api = {
  signIn: credentials => fetch.post(`${API_URL}/users/signin`, credentials),
  signUp: data => fetch.post(`${API_URL}/users/signup`, data),
  getAllRecipes: nextUrl => fetch.get(nextUrl || `${API_URL}/recipes`)
};

export default api;
