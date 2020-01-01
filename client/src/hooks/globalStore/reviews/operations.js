import { api, logger } from '../../../utils';

const operations = actions => {
  const { saveReviews, saveNextReviews } = actions;

  const fetchReviews = async recipeId => {
    try {
      const response = await api.getReviews(recipeId);
      logger('Reviews', response);
      saveReviews(response?.data);
    } catch (error) {
      logger('Reviews', await error);
    }
  };

  const fetchNextReviews = async recipeId => {
    try {
      const response = await api.getReviews(recipeId);
      logger('Next Reviews', response);
      saveNextReviews(response?.data);
    } catch (error) {
      logger('Reviews', await error);
    }
  };

  return {
    fetchReviews,
    fetchNextReviews
  };
};

export default operations;
