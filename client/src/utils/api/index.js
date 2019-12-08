import fetch from './fetch';

const { API_URL } = process.env;

const api = {
  signIn: credentials => fetch.post(`${API_URL}/users/signin`, credentials),
  signUp: data => fetch.post(`${API_URL}/users/signup`, data)
};

export default api;
