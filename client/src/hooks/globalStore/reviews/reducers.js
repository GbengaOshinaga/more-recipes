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

export const initialState = {
  isAddingReview: false,
  isFetchingNextReviews: false,
  reviews: [],
  paginationMeta: {}
};

const cache = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_REVIEWS:
      return {
        reviews: action.payload.reviews,
        paginationMeta: action.payload.paginationMeta
      };
    case SAVE_NEXT_REVIEWS:
      return {
        reviews: [...state.reviews, ...action.payload.reviews],
        paginationMeta: action.payload.paginationMeta
      };
    case SET_IS_FETCHING_NEXT_REVIEWS:
      return { ...state, isFetchingNextReviews: action.payload };
    case SET_IS_ADDING_REVIEW:
      return { ...state, isAddingReview: action.payload };
    case SAVE_REVIEW:
      return { ...state, reviews: state.reviews.concat(action.payload) };
    case EDIT_REVIEW_OPTIMISTICALLY: {
      const {
        payload: { reviewId, review }
      } = action;

      const reviewToUpdate = state.reviews.find(
        stateReview => stateReview.id === reviewId
      );

      cache[reviewId] = reviewToUpdate;

      return {
        ...state,
        reviews: state.reviews.map(stateReview => {
          if (stateReview.id === reviewId) {
            return { ...stateReview, review };
          }
          return stateReview;
        })
      };
    }
    case EDIT_REVIEW_REVERT: {
      const {
        payload: { reviewId }
      } = action;

      if (cache[reviewId]) {
        return {
          ...state,
          reviews: state.reviews.map(stateReview => {
            if (stateReview.id === reviewId) {
              return cache[reviewId];
            }
            return stateReview;
          })
        };
      }
      return state;
    }
    case DELETE_REVIEW_OPTIMISTICALLY: {
      const { payload: reviewId } = action;

      const reviewToDelete = state.reviews.find(
        stateReview => stateReview.id === reviewId
      );
      cache[reviewId] = reviewToDelete;

      return {
        ...state,
        reviews: state.reviews.filter(review => review.id !== reviewId)
      };
    }
    case DELETE_REVIEW_REVERT: {
      const { payload: reviewId } = action;

      if (cache[reviewId]) {
        return { ...state, reviews: [...state.reviews, cache[reviewId]] };
      }
      return state;
    }
    default:
      return state;
  }
};

export default reducer;
