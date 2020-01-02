export const SAVE_REVIEWS = 'SAVE_REVIEWS';
export const SAVE_NEXT_REVIEWS = 'SAVE_NEXT_REVIEWS';
export const SET_IS_ADDING_REVIEW = 'SET_IS_ADDING_REVIEW';
export const SAVE_REVIEW = 'SAVE_REVIEW';
export const EDIT_REVIEW_OPTIMISTICALLY = 'EDIT_REVIEW_OPTIMISTICALLY';
export const EDIT_REVIEW_REVERT = 'EDIT_REVIEW_REVERT';
export const DELETE_REVIEW_OPTIMISTICALLY = 'DELETE_REVIEW_OPTIMISTICALLY';
export const DELETE_REVIEW_REVERT = 'DELETE_REVIEW_REVERT';

export const saveReviews = reviews => ({
  type: SAVE_REVIEWS,
  payload: reviews
});

export const saveNextReviews = reviews => ({
  type: SAVE_NEXT_REVIEWS,
  payload: reviews
});

export const setIsAddingReview = isAddingReview => ({
  type: SET_IS_ADDING_REVIEW,
  payload: isAddingReview
});

export const saveReview = review => ({
  type: SAVE_REVIEW,
  payload: review
});

export const editReviewOptimistically = (reviewId, review) => ({
  type: EDIT_REVIEW_OPTIMISTICALLY,
  payload: { reviewId, review }
});

export const editReviewRevert = (reviewId, review) => ({
  type: EDIT_REVIEW_REVERT,
  payload: { reviewId, review }
});

export const deleteReviewOptimistically = reviewId => ({
  type: DELETE_REVIEW_OPTIMISTICALLY,
  payload: reviewId
});

export const deleteReviewRevert = reviewId => ({
  type: DELETE_REVIEW_REVERT,
  payload: reviewId
});
