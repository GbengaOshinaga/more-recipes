import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  useStoreContext,
  getIsFetchingUserFavorites,
  getFavorites
} from '../../hooks/globalStore';
import useActions from '../../hooks/useActions';
import NavBar from '../common/NavBar';
import RecipesDisplay from '../common/RecipesDisplay';

const FavoriteRecipes = () => {
  const { userFavorites, getUserFavorites } = useStoreContext();
  const renderActions = useActions();

  const isFetching = getIsFetchingUserFavorites(userFavorites);
  const recipes = getFavorites(userFavorites);

  useEffect(() => {
    getUserFavorites();
  }, [getUserFavorites]);

  return (
    <div>
      <NavBar />
      <Grid container justify="center">
        <Box mt={3} mb={3}>
          <Typography variant="h4">Favorite Recipes</Typography>
        </Box>
      </Grid>
      <RecipesDisplay
        isFetching={isFetching}
        recipes={recipes}
        renderActions={renderActions}
      />
    </div>
  );
};

export default FavoriteRecipes;
