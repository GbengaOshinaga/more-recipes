import expect from 'expect';
import reducer from '../../reducers/mostFavouritedReducer';
import * as types from '../../actions/actions';

describe('mostFavouritedRecipes reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle GET_MOST_FAVOURITED_RECIPES_SUCCESS', () => {
    expect(reducer([], {
      type: types.GET_MOST_FAVOURITED_RECIPES_SUCCESS,
      response: [{ name: 'Fried Chicken' }, { name: 'Fries' }]
    })).toEqual([{ name: 'Fried Chicken' }, { name: 'Fries' }]);
  });

  it('should handle VOTE_SUCCESS', () => {
    expect(reducer([{ id: 1, name: 'Fried Chicken', upvotes: [1] }], {
      type: types.VOTE_SUCCESS,
      response: { id: 1, name: 'Fried Chicken', upvotes: [1, 2] }
    })).toEqual([{ id: 1, name: 'Fried Chicken', upvotes: [1, 2] }]);
  });
});
