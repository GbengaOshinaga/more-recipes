import { api, logger } from '../../../utils';

const operations = actions => {
  const {
    setIsSearching,
    saveResults,
    saveNextResults,
    clearResults
  } = actions;

  const searchRecipes = async searchTerm => {
    setIsSearching(true);
    try {
      const response = await api.searchRecipes(searchTerm);
      logger('search response', response);
      saveResults(response?.data);
    } catch (error) {
      logger('Search error', await error);
      clearResults();
    } finally {
      setIsSearching(false);
    }
  };

  const getNextSearchResults = async (searchTerm, nextUrl) => {
    try {
      const response = await api.searchRecipes(searchTerm, nextUrl);
      logger('next search response', response);
      saveNextResults(response?.data);
    } catch (error) {
      logger('Next Search error', await error);
    }
  };

  return {
    searchRecipes,
    getNextSearchResults
  };
};

export default operations;
