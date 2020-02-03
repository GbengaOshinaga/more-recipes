import {
  SAVE_REVIEWS,
  SAVE_NEXT_REVIEWS,
  SAVE_REVIEW,
  SET_IS_ADDING_REVIEW,
  EDIT_REVIEW_OPTIMISTICALLY,
  EDIT_REVIEW_REVERT,
  DELETE_REVIEW_OPTIMISTICALLY,
  DELETE_REVIEW_REVERT,
  SET_IS_FETCHING_NEXT_REVIEWS
} from './actionCreators';
import reducer from './reducers';

jest.mock('moment', () => () => {
  return {
    toISOString: jest.fn().mockImplementation(() => '2020')
  };
});

describe('SAVE_REVIEWS', () => {
  it('should save reviews', () => {
    const initialState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [],
      paginationMeta: {}
    };
    const testAction = {
      type: SAVE_REVIEWS,
      payload: {
        reviews: [{ id: 1, review: 'nice' }],
        paginationMeta: { next: 'url' }
      }
    };
    const expectedState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [{ id: 1, review: 'nice' }],
      paginationMeta: { next: 'url' }
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});

describe('SET_IS_FETCHING_NEXT_REVIEWS', () => {
  it('should set isFetchingNextReviews', () => {
    const initialState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [],
      paginationMeta: {}
    };
    const testAction = {
      type: SET_IS_FETCHING_NEXT_REVIEWS,
      payload: true
    };
    const expectedState = {
      isAddingReview: false,
      isFetchingNextReviews: true,
      reviews: [],
      paginationMeta: {}
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});

describe('SAVE_NEXT_REVIEWS', () => {
  it('should save next reviews', () => {
    const initialState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [{ id: 1, review: 'nice' }],
      paginationMeta: { next: 'url' }
    };
    const testAction = {
      type: SAVE_NEXT_REVIEWS,
      payload: {
        reviews: [{ id: 2, review: 'cool' }],
        paginationMeta: { prev: 'url' }
      }
    };
    const expectedState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [
        { id: 1, review: 'nice' },
        { id: 2, review: 'cool' }
      ],
      paginationMeta: { prev: 'url' }
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});

describe('SAVE_REVIEW', () => {
  it('should save single review', () => {
    const initialState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [{ id: 1, review: 'nice' }],
      paginationMeta: { next: 'url' }
    };
    const testAction = {
      type: SAVE_REVIEW,
      payload: { id: 2, review: 'cool' }
    };
    const expectedState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [
        { id: 1, review: 'nice' },
        { id: 2, review: 'cool' }
      ],
      paginationMeta: { next: 'url' }
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});

describe('SET_IS_ADDING_REVIEW', () => {
  it('should set isAddingReview', () => {
    const initialState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [],
      paginationMeta: {}
    };
    const testAction = {
      type: SET_IS_ADDING_REVIEW,
      payload: true
    };
    const expectedState = {
      isAddingReview: true,
      isFetchingNextReviews: false,
      reviews: [],
      paginationMeta: {}
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});

describe('EDIT_REVIEW_OPTIMISTICALLY', () => {
  it('should edit review', () => {
    const initialState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [
        { id: 1, review: 'nice' },
        { id: 2, review: 'cool' }
      ],
      paginationMeta: {}
    };
    const testAction = {
      type: EDIT_REVIEW_OPTIMISTICALLY,
      payload: { reviewId: 1, review: 'okay' }
    };
    const expectedState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [
        { id: 1, review: 'okay', updatedAt: '2020' },
        { id: 2, review: 'cool' }
      ],
      paginationMeta: {}
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});

describe('EDIT_REVIEW_REVERT', () => {
  it('should revert save action', () => {
    const ogInitialState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [
        { id: 1, review: 'nice' },
        { id: 2, review: 'cool' }
      ],
      paginationMeta: {}
    };
    const savedTestAction = {
      type: EDIT_REVIEW_OPTIMISTICALLY,
      payload: { reviewId: 1, review: 'okay' }
    };
    // Need to perform a save action first to implement the cache
    const initialState = reducer(ogInitialState, savedTestAction);

    const testAction = {
      type: EDIT_REVIEW_REVERT,
      payload: { reviewId: 1 }
    };
    expect(reducer(initialState, testAction)).toEqual(ogInitialState);
  });
});

describe('DELETE_REVIEW_OPTIMISTICALLY', () => {
  it('should delete review', () => {
    const initialState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [{ id: 1, review: 'nice' }],
      paginationMeta: {}
    };
    const testAction = {
      type: DELETE_REVIEW_OPTIMISTICALLY,
      payload: 1
    };
    const expectedState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [],
      paginationMeta: {}
    };
    expect(reducer(initialState, testAction)).toEqual(expectedState);
  });
});

describe('DELETE_REVIEW_REVERT', () => {
  it('should revert delete action', () => {
    const ogInitialState = {
      isAddingReview: false,
      isFetchingNextReviews: false,
      reviews: [{ id: 1, review: 'nice' }],
      paginationMeta: {}
    };
    const delTestAction = {
      type: DELETE_REVIEW_OPTIMISTICALLY,
      payload: 1
    };
    const initialState = reducer(ogInitialState, delTestAction);

    const testAction = {
      type: DELETE_REVIEW_REVERT,
      payload: 1
    };
    expect(reducer(initialState, testAction)).toEqual(ogInitialState);
  });
});
