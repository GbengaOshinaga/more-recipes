import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as recipeActions from '../../actions/RecipeActions';
import * as types from '../../actions/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Recipe async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates GET_RECIPES_SUCCESS when fetching recipes has been done', () => {
    fetchMock
      .getOnce('/api/v1/recipes', {
        body: {
          status: 'success',
          data: { recipes: [{ name: 'recipe' }], paginationMeta: {} }
        },
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      });


    const expectedActions = [
      { type: types.CLEAR_RECIPES },
      { type: types.CLEAR_PAGINATION },
      { response: [{ Reviews: [], name: 'recipe' }], type: types.GET_RECIPES_SUCCESS },
      { response: {}, type: types.GET_PAGINATION_META }];
    const store = mockStore({ recipes: [] });

    return store.dispatch(recipeActions.getAllRecipes()).then(() => {
      // return of async actions
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_REVIEWS_SUCCESS when fetching reviews is done', () => {
    fetchMock.getOnce('/api/v1/recipes/1/reviews', {
      body: {
        status: 'success',
        data: { reviews: [{ name: 'review' }], paginationMeta: {} }
      },
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    });

    const expectedActions = [
      { type: types.GET_REVIEWS_SUCCESS, response: [{ name: 'review' }] },
      { type: types.GET_REVIEWS_PAGINATION_META, response: {} }
    ];
    const store = mockStore({ recipes: { Reviews: [], name: 'recipe' }, paginationMeta: {} });

    return store.dispatch(recipeActions.getRecipeReviews(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_RECIPE_SUCCESS when fetching recipe is done', () => {
    fetchMock.getOnce('/api/v1/recipes/1', {
      body: {
        status: 'success',
        data: { recipe: { name: 'recipe' } }
      },
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    });

    const expectedActions = [
      { type: types.GET_RECIPE_SUCCESS, response: { Reviews: [], name: 'recipe' } }
    ];
    const store = mockStore({ recipes: [] });

    return store.dispatch(recipeActions.getRecipe(1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates ADD_REVIEW_SUCCESS when adding review is done', () => {
    fetchMock.postOnce('/api/v1/recipes/1/reviews', {
      body: {
        status: 'success',
        data: { review: { RecipeId: 1, review: 'cool recipe' } }
      },
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    });

    const expectedActions = [
      { type: types.ADD_REVIEW_SUCCESS, response: { RecipeId: 1, review: 'cool recipe' } }
    ];
    const store = mockStore({ recipes: [{}] });

    return store.dispatch(recipeActions.addReview(1, 'token', 'cool recipe')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates VOTE_SUCCESS when upvoting is done', () => {
    fetchMock.postOnce('/api/v1/recipes/upvote/1', {
      body: {
        status: 'success',
        data: { recipe: { name: 'recipe', upvotes: [1] } }
      }
    });

    const expectedActions = [
      { type: types.VOTE_SUCCESS, response: { name: 'recipe', upvotes: [1] } }
    ];
    const store = mockStore({ recipes: [{}] });

    return store.dispatch(recipeActions.upvoteRecipe(1, 'token')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates VOTE_SUCCESS when downvoting is done', () => {
    fetchMock.postOnce('/api/v1/recipes/downvote/1', {
      body: {
        status: 'success',
        data: { recipe: { name: 'recipe', downvotes: [1] } }
      }
    });

    const expectedActions = [
      { type: types.VOTE_SUCCESS, response: { name: 'recipe', downvotes: [1] } }
    ];
    const store = mockStore({ recipes: [{}] });

    return store.dispatch(recipeActions.downvoteRecipe(1, 'token')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_SEARCH_RESULTS when searching is done', () => {
    fetchMock.getOnce('/api/v1/recipes?query=fried', {
      body: {
        status: 'success',
        data: { recipes: [{ name: 'fried' }] }
      }
    });

    const expectedActions = [
      { type: types.GET_SEARCH_RESULTS, response: [{ name: 'fried' }] }
    ];
    const store = mockStore({ searchResults: [] });

    return store.dispatch(recipeActions.search('fried')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_SEARCH_RESULTS_FAILURE when searching is done', () => {
    fetchMock.getOnce('/api/v1/recipes?query=Not Found', {
      body: {
        status: 'fail',
        data: { message: 'No Results Found' }
      }
    });

    const expectedActions = [
      { type: types.GET_SEARCH_RESULTS_FAILURE }
    ];
    const store = mockStore({ searchResults: [] });

    return store.dispatch(recipeActions.search('Not Found')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_USER_FAVOURITES_SUCCESS when getting user favourites is done', () => {
    fetchMock.getOnce('/api/v1/users/recipes/favourites', {
      body: {
        status: 'success',
        data: { favourites: [{ name: 'recipe' }] }
      }
    });

    const expectedActions = [
      { type: types.GET_USER_FAVOURITES_SUCCESS, response: [{ name: 'recipe' }] }
    ];
    const store = mockStore({ userFavourites: [] });

    return store.dispatch(recipeActions.getFavourites('token')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_USER_FAVOURITES_FAILURE when getting user favourites is done', () => {
    fetchMock.getOnce('/api/v1/users/recipes/favourites', {
      body: {
        status: 'fail',
        data: { message: 'No Favourites' }
      }
    });

    const expectedActions = [
      { type: types.GET_USER_FAVOURITES_FAILURE }
    ];
    const store = mockStore({ userFavourites: [{ name: 'recipe' }] });

    return store.dispatch(recipeActions.getFavourites('token')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_MOST_FAVOURITED_RECIPES_SUCCESS when getting most favourited recipes', () => {
    fetchMock.getOnce('/api/v1/recipes/most_favourited', {
      body: {
        status: 'success',
        data: { recipes: [{ name: 'most favourited' }] }
      }
    });

    const expectedActions = [
      { type: types.GET_MOST_FAVOURITED_RECIPES_SUCCESS, response: [{ name: 'most favourited' }] }
    ];
    const store = mockStore({ mostFavourited: [] });

    return store.dispatch(recipeActions.getMostFavouritedRecipes()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
