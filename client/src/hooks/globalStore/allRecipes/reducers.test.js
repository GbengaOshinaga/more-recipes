import {
  SET_IS_FETCHING_RECIPES,
  SAVE_RECIPES,
  SAVE_NEXT_RECIPES
} from './actionCreators';
import reducer from './reducers';

describe('SET_IS_REFRESHING_HISTORY', () => {
  it('should update isRefreshing', () => {
    const initialState = {
      isFetching: false,
      recipes: [],
      paginationMeta: {}
    };
    const testAction = {
      type: SET_IS_FETCHING_RECIPES,
      payload: true
    };
    const expectedState = {
      isFetching: true,
      recipes: [],
      paginationMeta: {}
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});

describe('SAVE_RECIPES', () => {
  it('should save recipes', () => {
    const initialState = {
      isFetching: false,
      recipes: [],
      paginationMeta: {}
    };
    const testAction = {
      type: SAVE_RECIPES,
      payload: {
        recipes: [{ name: 'recipe' }],
        paginationMeta: { next: 'url' }
      }
    };
    const expectedState = {
      isFetching: false,
      recipes: [{ name: 'recipe' }],
      paginationMeta: { next: 'url' }
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});

describe('SAVE_NEXT_RECIPES', () => {
  it('should save next recipes', () => {
    const initialState = {
      isFetching: false,
      recipes: [{ name: 'recipe' }],
      paginationMeta: { next: 'url' }
    };
    const testAction = {
      type: SAVE_NEXT_RECIPES,
      payload: {
        recipes: [{ name: 'recipe 2' }],
        paginationMeta: { next: 'url 2' }
      }
    };
    const expectedState = {
      isFetching: false,
      recipes: [{ name: 'recipe' }, { name: 'recipe 2' }],
      paginationMeta: { next: 'url 2' }
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});
