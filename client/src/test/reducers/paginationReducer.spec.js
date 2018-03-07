import expect from 'expect';
import reducer from '../../reducers/paginationReducer';
import * as types from '../../actions/actions';

describe('pagination reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle GET_PAGINATION_META', () => {
    expect(reducer({}, {
      type: types.GET_PAGINATION_META,
      response: {
        from: 6,
        limit: 6,
        total: 24,
        next: 'http://localhost:8000/api/v1/recipes?from=12&limit=6',
        previous: 'http://localhost:8000/api/v1/recipes?from=0&limit=6'
      }
    })).toEqual({
      from: 6,
      limit: 6,
      total: 24,
      next: 'http://localhost:8000/api/v1/recipes?from=12&limit=6',
      previous: 'http://localhost:8000/api/v1/recipes?from=0&limit=6'
    });
  });
});
