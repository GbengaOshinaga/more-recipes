import expect from 'expect';
import reducer from '../../reducers/userFavouritesReducer';
import * as types from '../../actions/actions';

describe('userFavouritesRecipes reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle GET_USER_FAVOURITES_SUCCESS', () => {
    expect(reducer([], {
      type: types.GET_USER_FAVOURITES_SUCCESS,
      response: [{ name: 'Fried Chicken' }, { name: 'Fries' }]
    })).toEqual([{ name: 'Fried Chicken' }, { name: 'Fries' }]);
  });

  it('should handle GET_USER_FAVOURITES_FAILURE', () => {
    expect(reducer([{ name: 'Fried Chicken' }, { name: 'Fries' }], {
      type: types.GET_USER_FAVOURITES_FAILURE,
      response: []
    })).toEqual([]);
  });

  it('should handle VOTE_SUCCESS', () => {
    expect(reducer([{ id: 1, name: 'Fried Chicken', upvotes: [1] }], {
      type: types.VOTE_SUCCESS,
      response: { id: 1, name: 'Fried Chicken', upvotes: [1, 2] }
    })).toEqual([{ id: 1, name: 'Fried Chicken', upvotes: [1, 2] }]);
  });
});
