import { api, logger } from '../../../utils';

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
      logger('Reviews', response);
      saveReviews(response?.data);
    } catch (error) {
      logger('Reviews', await error);
    }
  };

  const fetchNextReviews = async nextUrl => {
    setIsFetchingNextReviews(true);
    try {
      const response = await api.getReviews(null, nextUrl);
      logger('Next Reviews', response);
      saveNextReviews(response?.data);
    } catch (error) {
      logger('Reviews', await error);
    } finally {
      setIsFetchingNextReviews(false);
    }
  };

  const addReview = async (recipeId, review) => {
    setIsAddingReview(true);
    try {
      const response = await api.addReview(recipeId, review);
      logger('Add review', response);
      saveReview(response?.data?.review);
    } catch (error) {
      logger('Add review error', error);
    } finally {
      setIsAddingReview(false);
    }
  };

  const editReview = async (reviewId, review) => {
    editReviewOptimistically(reviewId, review);
    try {
      await api.editReview(reviewId, review);
    } catch (error) {
      logger('Edit review error', await error);
      editReviewRevert(reviewId);
    }
  };

  const deleteReview = async reviewId => {
    deleteReviewOptimistically(reviewId);
    try {
      await api.deleteReview(reviewId);
    } catch (error) {
      logger('Delete review error', await error);
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
