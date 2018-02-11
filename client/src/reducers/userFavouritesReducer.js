import initialState from './initialState';
import { GET_USER_FAVOURITES_SUCCESS, GET_USER_FAVOURITES_FAILURE, VOTE_SUCCESS } from '../actions/actions';

/**
 * userRecipes reducer
 * @param {*} state
 * @param {*} action
 * @returns {object} new state
 */
export default function userRecipesReducer(state = initialState.userFavourites, action) {
  const { response } = action;
  switch (action.type) {
    case GET_USER_FAVOURITES_SUCCESS:
      return [...response];

    case GET_USER_FAVOURITES_FAILURE:
      return [];

    case VOTE_SUCCESS:
      return [...state.map((recipe) => {
        if (recipe.id === response.id) {
          return { ...recipe, ...response };
        }
        return recipe;
      })];

    default:
      return state;
  }
}

