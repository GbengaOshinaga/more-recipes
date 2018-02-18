import expect from 'expect';
import reducer from '../../reducers/recipesReducer';
import * as types from '../../actions/actions';

describe('recipes reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle GET_RECIPES_SUCCESS', () => {
    expect(reducer([], {
      type: types.GET_RECIPES_SUCCESS,
      response: [{ name: 'Fried Chicken' }, { name: 'Fries' }]
    })).toEqual([{ name: 'Fried Chicken' }, { name: 'Fries' }]);
  });

  it('should handle GET_RECIPE_SUCCESS', () => {
    expect(reducer([], {
      type: types.GET_RECIPE_SUCCESS,
      response: { name: 'Fried Chicken' }
    })).toEqual([{ name: 'Fried Chicken' }]);
  });

  it('should handle VOTE_SUCCESS', () => {
    expect(reducer([{ id: 1, name: 'Fried Chicken', upvotes: [1] }], {
      type: types.VOTE_SUCCESS,
      response: { id: 1, name: 'Fried Chicken', upvotes: [1, 2] }
    })).toEqual([{ id: 1, name: 'Fried Chicken', upvotes: [1, 2] }]);
  });

  it('should handle ADD_REVIEW_SUCCESS', () => {
    expect(reducer([{ id: 1, name: 'Fried Chicken', Reviews: [{ RecipeId: 1, review: 'Love it' }] }], {
      type: types.ADD_REVIEW_SUCCESS,
      response: { RecipeId: 1, review: 'Hate it' }
    })).toEqual([{
      id: 1,
      name: 'Fried Chicken',
      Reviews: [
        { RecipeId: 1, review: 'Love it' },
        { RecipeId: 1, review: 'Hate it' }
      ]
    }]);
  });
});
