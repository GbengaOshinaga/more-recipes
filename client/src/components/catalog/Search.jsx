import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  useStoreContext,
  getIsSearching,
  getSearchResults,
  getSearchResultsPaginationMeta
} from '../../hooks/globalStore';
import useDebounce from '../../hooks/useDebounce';
import useActions from '../../hooks/useActions';
import RecipesDisplay from '../common/RecipesDisplay';
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

  const hasNoResults = !isSearching && !results?.length;

  return (
    <>
      <Paper className={styles.container}>
        <Typography variant="body2" color="textSecondary">
          SEARCH RESULTS
        </Typography>
      </Paper>
      <Box p={3}>
        {hasNoResults ? (
          <Typography variant="h5">No Result(s) Found</Typography>
        ) : (
          <RecipesDisplay
            isFetching={isSearching}
            recipes={results}
            hasMore={!!nextUrl}
            fetchNext={fetchNext}
            renderActions={renderActions}
          />
        )}
      </Box>
    </>
  );
};

export default Search;
