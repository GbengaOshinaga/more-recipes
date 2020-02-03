import operations from './operations';

const actions = {
  saveReviews: jest.fn(),
  saveNextReviews: jest.fn(),
  setIsFetchingNextReviews: jest.fn(),
  setIsAddingReview: jest.fn(),
  saveReview: jest.fn(),
  editReviewOptimistically: jest.fn(),
  editReviewRevert: jest.fn(),
  deleteReviewOptimistically: jest.fn(),
  deleteReviewRevert: jest.fn()
};

const api = {
  getReviews: jest.fn(),
  addReview: jest.fn(),
  editReview: jest.fn(),
  deleteReview: jest.fn()
};

const reviewsResponse = {
  status: 'success',
  data: {
    reviews: [{ id: 1, review: 'nice' }],
    paginationMeta: { next: 'url' }
  }
};

const reviewResponse = {
  status: 'success',
  data: { review: { id: 1, review: 'cool' } }
};

const recipeId = 1;

const {
  fetchReviews,
  fetchNextReviews,
  addReview,
  editReview,
  deleteReview
} = operations(actions, api);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('fetchReviews', () => {
  it('should fetch reviews successfully', async () => {
    api.getReviews.mockResolvedValue(reviewsResponse);

    await fetchReviews(recipeId);

    expect(api.getReviews).toHaveBeenCalledWith(recipeId);
    expect(actions.saveReviews).toHaveBeenCalledWith(reviewsResponse.data);
  });

  it('should handle error case', async () => {
    const testError = new Error(123);
    api.getReviews.mockRejectedValue(testError);

    await fetchReviews(recipeId);

    expect(api.getReviews).toHaveBeenCalledWith(recipeId);
    expect(actions.saveReviews).not.toHaveBeenCalled();
  });
});

describe('fetchNextReviews', () => {
  it('should fetch next reviews successfully', async () => {
    api.getReviews.mockResolvedValue(reviewsResponse);

    await fetchNextReviews('url');

    expect(actions.setIsFetchingNextReviews).toHaveBeenCalledWith(true);
    expect(api.getReviews).toHaveBeenCalledWith(null, 'url');
    expect(actions.saveNextReviews).toHaveBeenCalledWith(reviewsResponse.data);
    expect(actions.setIsFetchingNextReviews).toHaveBeenCalledWith(false);
  });

  it('should handle error case', async () => {
    const testError = new Error(123);
    api.getReviews.mockRejectedValue(testError);

    await fetchNextReviews('url');

    expect(actions.setIsFetchingNextReviews).toHaveBeenCalledWith(true);
    expect(api.getReviews).toHaveBeenCalledWith(null, 'url');
    expect(actions.saveNextReviews).not.toHaveBeenCalled();
    expect(actions.setIsFetchingNextReviews).toHaveBeenCalledWith(false);
  });
});

describe('addReview', () => {
  it('should add review successfully', async () => {
    api.addReview.mockResolvedValue(reviewResponse);

    await addReview(recipeId, { review: 'cool' });

    expect(actions.setIsAddingReview).toHaveBeenCalledWith(true);
    expect(api.addReview).toHaveBeenCalledWith(recipeId, { review: 'cool' });
    expect(actions.saveReview).toHaveBeenCalledWith(reviewResponse.data.review);
    expect(actions.setIsAddingReview).toHaveBeenCalledWith(false);
  });

  it('should handle error case', async () => {
    const testError = new Error(123);
    api.addReview.mockRejectedValue(testError);

    await addReview(recipeId, { review: 'cool' });

    expect(actions.setIsAddingReview).toHaveBeenCalledWith(true);
    expect(api.addReview).toHaveBeenCalledWith(recipeId, { review: 'cool' });
    expect(actions.saveReview).not.toHaveBeenCalled();
    expect(actions.setIsAddingReview).toHaveBeenCalledWith(false);
  });
});

describe('editReview', () => {
  const reviewId = 1;
  const review = 'cool';

  it('should edit review successfully', async () => {
    await editReview(reviewId, review);

    expect(actions.editReviewOptimistically).toHaveBeenCalledWith(
      reviewId,
      review
    );
    expect(api.editReview).toHaveBeenCalledWith(reviewId, review);
  });

  it('should handle error and revert', async () => {
    const testError = new Error(123);

    api.editReview.mockRejectedValue(testError);
    await editReview(reviewId, review);

    expect(actions.editReviewOptimistically).toHaveBeenCalledWith(
      reviewId,
      review
    );
    expect(api.editReview).toHaveBeenCalledWith(reviewId, review);
    expect(actions.editReviewRevert).toHaveBeenCalledWith(reviewId);
  });
});

describe('deleteReview', () => {
  const reviewId = 1;

  it('should delete review successfully', async () => {
    await deleteReview(reviewId);

    expect(actions.deleteReviewOptimistically).toHaveBeenCalledWith(reviewId);
    expect(api.deleteReview).toHaveBeenCalledWith(reviewId);
  });

  it('should handle error and revert', async () => {
    const testError = new Error(123);

    api.deleteReview.mockRejectedValue(testError);

    await deleteReview(reviewId);

    expect(actions.deleteReviewOptimistically).toHaveBeenCalledWith(reviewId);
    expect(api.deleteReview).toHaveBeenCalledWith(reviewId);
    expect(actions.deleteReviewRevert).toHaveBeenCalledWith(reviewId);
  });
});
