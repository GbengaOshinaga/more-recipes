import {
  SET_IS_FETCHING_MOST_FAVORITES,
  SAVE_MOST_FAVORITES
} from './actionCreators';
import reducer from './reducers';

describe('SET_IS_FETCHING_MOST_FAVORITES', () => {
  it('should update isFetching', () => {
    const initialState = {
      isFetching: false,
      recipes: []
    };
    const testAction = {
      type: SET_IS_FETCHING_MOST_FAVORITES,
      payload: true
    };
    const expectedState = {
      isFetching: true,
      recipes: []
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});

describe('SAVE_MOST_FAVORITES', () => {
  it('should save favorites', () => {
    const initialState = {
      isFetching: false,
      recipes: []
    };
    const testAction = {
      type: SAVE_MOST_FAVORITES,
      payload: { recipes: [{ id: 1, name: 'Cheesecake' }] }
    };
    const expectedState = {
      isFetching: false,
      recipes: [{ id: 1, name: 'Cheesecake' }]
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});
