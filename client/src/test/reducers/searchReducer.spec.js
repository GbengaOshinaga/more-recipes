import expect from 'expect';
import reducer from '../../reducers/searchReducer';
import * as types from '../../actions/actions';

describe('search reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle GET_SEARCH_RESULTS', () => {
    expect(reducer([], {
      type: types.GET_SEARCH_RESULTS,
      response: [{ name: 'Fried Chicken' }, { name: 'Fries' }]
    })).toEqual([{ name: 'Fried Chicken' }, { name: 'Fries' }]);
  });

  it('should handle GET_SEARCH_RESULTS_FAILURE', () => {
    expect(reducer([{ name: 'Fried Chicken' }, { name: 'Fries' }], {
      type: types.GET_SEARCH_RESULTS_FAILURE,
      response: []
    })).toEqual([]);
  });
});
