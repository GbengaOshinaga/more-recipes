export const SAVE_REVIEWS = 'SAVE_REVIEWS';
export const SAVE_NEXT_REVIEWS = 'SAVE_NEXT_REVIEWS';

export const saveReviews = reviews => ({
  type: SAVE_REVIEWS,
  payload: reviews
});

export const saveNextReviews = reviews => ({
  type: SAVE_NEXT_REVIEWS,
  payload: reviews
});
