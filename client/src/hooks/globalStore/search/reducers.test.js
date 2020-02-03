import {
  SET_IS_SEARCHING,
  SAVE_RESULTS,
  SAVE_NEXT_RESULTS,
  CLEAR_RESULTS
} from './actionCreators';
import reducer from './reducers';

describe('SET_IS_SEARCHING', () => {
  it('should set isSearching', () => {
    const initialState = {
      isSearching: false,
      recipes: [],
      paginationMeta: {}
    };
    const testAction = {
      type: SET_IS_SEARCHING,
      payload: true
    };
    const expectedState = {
      isSearching: true,
      recipes: [],
      paginationMeta: {}
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});

describe('SAVE_RESULTS', () => {
  it('should save results', () => {
    const initialState = {
      isSearching: false,
      recipes: [],
      paginationMeta: {}
    };
    const testAction = {
      type: SAVE_RESULTS,
      payload: {
        recipes: [{ id: 1, name: 'Cheesecake' }],
        paginationMeta: { next: 'url' }
      }
    };
    const expectedState = {
      isSearching: false,
      recipes: [{ id: 1, name: 'Cheesecake' }],
      paginationMeta: { next: 'url' }
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});

describe('SAVE_NEXT_RESULTS', () => {
  it('should save next results', () => {
    const initialState = {
      isSearching: false,
      recipes: [{ id: 1, name: 'Cheesecake' }],
      paginationMeta: { next: 'url ' }
    };
    const testAction = {
      type: SAVE_NEXT_RESULTS,
      payload: {
        recipes: [{ id: 2, name: 'steak' }],
        paginationMeta: { prev: 'url' }
      }
    };
    const expectedState = {
      isSearching: false,
      recipes: [
        { id: 1, name: 'Cheesecake' },
        { id: 2, name: 'steak' }
      ],
      paginationMeta: { prev: 'url' }
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});

describe('CLEAR_RESULTS', () => {
  it('should clear results', () => {
    const initialState = {
      isSearching: false,
      recipes: [{ id: 1, name: 'Cheesecake' }],
      paginationMeta: { next: 'url ' }
    };
    const testAction = {
      type: CLEAR_RESULTS
    };
    const expectedState = {
      isSearching: false,
      recipes: [],
      paginationMeta: {}
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});
