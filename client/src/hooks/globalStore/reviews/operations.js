import { api, log, logError } from '../../../utils';

const operations = actions => {
  const {
    saveReviews,
    saveNextReviews,
    setIsFetchingNextReviews,
    setIsAddingReview,
    saveReview,
    editReviewOptimistically,
    editReviewRevert,
    deleteReviewOptimistically,
    deleteReviewRevert
  } = actions;

  const fetchReviews = async recipeId => {
    try {
      const response = await api.getReviews(recipeId);
      log('Reviews', response);
      saveReviews(response?.data);
    } catch (error) {
      logError(await error, 'Error in Fetch Reviews');
    }
  };

  const fetchNextReviews = async nextUrl => {
    setIsFetchingNextReviews(true);
    try {
      const response = await api.getReviews(null, nextUrl);
      log('Next Reviews', response);
      saveNextReviews(response?.data);
    } catch (error) {
      logError(await error, 'Error in Fetch Next Reviews');
    } finally {
      setIsFetchingNextReviews(false);
    }
  };

  const addReview = async (recipeId, review) => {
    setIsAddingReview(true);
    try {
      const response = await api.addReview(recipeId, review);
      log('Add review', response);
      saveReview(response?.data?.review);
    } catch (error) {
      logError(await error, 'Add review error');
    } finally {
      setIsAddingReview(false);
    }
  };

  const editReview = async (reviewId, review) => {
    editReviewOptimistically(reviewId, review);
    try {
      await api.editReview(reviewId, review);
    } catch (error) {
      logError(await error, 'Edit review error');
      editReviewRevert(reviewId);
    }
  };

  const deleteReview = async reviewId => {
    deleteReviewOptimistically(reviewId);
    try {
      await api.deleteReview(reviewId);
    } catch (error) {
      logError(await error, 'Delete review error');
      deleteReviewRevert(reviewId);
    }
  };

  return {
    fetchReviews,
    fetchNextReviews,
    addReview,
    editReview,
    deleteReview
  };
};

export default operations;
