import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import {
  useStoreContext,
  getIsSearching,
  getSearchResults,
  getSearchResultsPaginationMeta
} from '../../hooks/globalStore';
import useDebounce from '../../hooks/useDebounce';
import RecipesDisplay from '../common/RecipesDisplay';
import useActions from './useActions';
import styles from './Search.modules.scss';

const Search = ({ searchTerm }) => {
  const { search, searchRecipes, getNextSearchResults } = useStoreContext();
  const renderActions = useActions();

  const debouncedSearchTerm = useDebounce(searchTerm);
  const isSearching = getIsSearching(search);
  const results = getSearchResults(search);
  const { next: nextUrl } = getSearchResultsPaginationMeta(search);

  useEffect(() => {
    if (debouncedSearchTerm) {
      searchRecipes(debouncedSearchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const fetchNext = () => {
    getNextSearchResults(searchTerm, nextUrl);
  };

  if (!results?.length) {
    return <h1>No Result(s) Found</h1>;
  }

  return (
    <>
      <Paper className={styles.container}>
        <div className={styles.textContainer}>
          <h1>Search Results</h1>
        </div>
      </Paper>
      <RecipesDisplay
        isFetching={isSearching}
        recipes={results}
        hasMore={!!nextUrl}
        fetchNext={fetchNext}
        renderActions={renderActions}
      />
    </>
  );
};

export default Search;
