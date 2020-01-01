import { SAVE_REVIEWS, SAVE_NEXT_REVIEWS } from './actionCreators';

export const initialState = {
  reviews: [],
  paginationMeta: {}
};

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
    default:
      return state;
  }
};

export default reducer;
