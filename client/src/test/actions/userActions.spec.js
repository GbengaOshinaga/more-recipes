import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import expect from 'expect';
import * as userActions from '../../actions/userActions';
import * as types from '../../actions/actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('User async actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('creates ADD_RECIPE_SUCCESS when adding recipe is done', () => {
    fetchMock.postOnce('/api/v1/recipes', {
      body: {
        status: 'success',
        data: { recipe: { name: 'recipe' } }
      }
    });
    const data = { ingredients: [] };
    const expectedActions = [
      { type: types.ADD_RECIPE_SUCCESS, response: { name: 'recipe' } }
    ];
    const store = mockStore({ recipes: [] });

    return store.dispatch(userActions.addRecipe('token', data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates DELETE_RECIPE_SUCCESS when adding recipe is done', () => {
    fetchMock.deleteOnce('/api/v1/recipes/1', {
      body: {
        status: 'success',
        data: { message: 'Recipe Deleted', recipe: { id: '1' } }
      }
    });

    const expectedActions = [
      { type: types.DELETE_RECIPE_SUCCESS, id: 1 }
    ];
    const store = mockStore({ recipes: [] });

    return store.dispatch(userActions.deleteRecipe('token', 1)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates GET_USERS_RECIPES_SUCCESS when getting user recipes is done', () => {
    fetchMock.getOnce('/api/v1/users/recipes', {
      body: {
        status: 'success',
        data: { recipes: [{ name: 'recipe' }] }
      }
    });

    const expectedActions = [
      { type: types.GET_USERS_RECIPES_SUCCESS, response: [{ name: 'recipe' }] }
    ];
    const store = mockStore({ userRecipes: [] });

    return store.dispatch(userActions.getUserRecipes('token')).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates EDIT_RECIPE_SUCCESS when editing recipe is done', () => {
    fetchMock.putOnce('/api/v1/recipes/1', {
      body: {
        status: 'success',
        data: { updatedRecipe: { name: 'updated' } }
      }
    });

    const data = { ingredients: [] };
    const expectedActions = [
      { type: types.EDIT_RECIPE_SUCCESS, response: { name: 'updated' } }
    ];
    const store = mockStore({ recipes: { name: 'recipe' } });

    return store.dispatch(userActions.editRecipe('token', 1, data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
