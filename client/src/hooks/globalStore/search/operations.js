import { api, log, logError } from '../../../utils';

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
      log('search response', response);
      saveResults(response?.data);
    } catch (error) {
      logError(await error, 'Search error');
      clearResults();
    } finally {
      setIsSearching(false);
    }
  };

  const getNextSearchResults = async (searchTerm, nextUrl) => {
    try {
      const response = await api.searchRecipes(searchTerm, nextUrl);
      log('next search response', response);
      saveNextResults(response?.data);
    } catch (error) {
      logError(await error, 'Next Search error');
    }
  };

  return {
    searchRecipes,
    getNextSearchResults
  };
};

export default operations;
