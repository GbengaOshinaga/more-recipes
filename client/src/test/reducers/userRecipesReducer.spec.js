import expect from 'expect';
import reducer from '../../reducers/userRecipesReducer';
import * as types from '../../actions/actions';

describe('userRecipes reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle ADD_RECIPE_SUCCESS', () => {
    expect(reducer([{ name: 'Fried Chicken' }], {
      type: types.ADD_RECIPE_SUCCESS,
      response: { name: 'Fries' }
    })).toEqual([{ name: 'Fried Chicken' }, { name: 'Fries' }]);
  });

  it('should handle GET_USERS_RECIPES_SUCCESS', () => {
    expect(reducer([], {
      type: types.GET_USERS_RECIPES_SUCCESS,
      response: [{ name: 'Fried Chicken' }, { name: 'Fries' }]
    })).toEqual([{ name: 'Fried Chicken' }, { name: 'Fries' }]);
  });

  it('should handle DELETE_RECIPE_SUCCESS', () => {
    expect(reducer([{ id: 1, name: 'Fried Chicken' }, { id: 2, name: 'Fries' }], {
      type: types.DELETE_RECIPE_SUCCESS,
      id: 1
    })).toEqual([{ id: 2, name: 'Fries' }]);
  });

  it('should handle EDIT_RECIPE_SUCCESS', () => {
    expect(reducer([{ id: 1, name: 'Fried Chicken' }, { id: 2, name: 'Fries' }], {
      type: types.EDIT_RECIPE_SUCCESS,
      response: { id: 1, name: 'Fried Turkey' }
    })).toEqual([{ id: 1, name: 'Fried Turkey' }, { id: 2, name: 'Fries' }]);
  });
});
