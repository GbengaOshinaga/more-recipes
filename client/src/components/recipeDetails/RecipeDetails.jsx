import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {
  useStoreContext,
  getIsFetchingRecipeDetails,
  getRecipeDetails
} from '../../hooks/globalStore';
import { decode } from '../../utils';
import useActions from '../../hooks/useActions';
import NavBar from '../common/NavBar';
import Reviews from './Reviews';
import useStyles from './RecipeDetailsStyles';

const defaultImage =
  'https://res.cloudinary.com/king-more-recipes/image/upload/v1518028470/10546i3DAC5A5993C8BC8C_vtqogc.jpg';

const RecipeDetails = () => {
  const { recipeDetails, fetchRecipeDetails } = useStoreContext();
  const { id } = useParams();
  const renderActions = useActions();
  const classes = useStyles();

  const isFetching = getIsFetchingRecipeDetails(recipeDetails);
  const recipe = getRecipeDetails(recipeDetails);

  const { name, image, description, ingredients, createdAt } = recipe;

  useEffect(() => {
    fetchRecipeDetails(id);
  }, [fetchRecipeDetails, id]);

  const renderContent = () => {
    if (isFetching) {
      return <CircularProgress />;
    }

    return (
      <>
        <Typography variant="h4">{decode(name)}</Typography>
        <Typography color="textSecondary">
          {moment(createdAt).format('LL')}
        </Typography>
        <Box mt={3}>
          <Typography variant="body1">DESCRIPTION</Typography>
          <Box ml={2}>
            <Typography variant="body2" color="textSecondary">
              {decode(description)}
            </Typography>
          </Box>
        </Box>
        <Box mt={3}>
          <Typography variant="body1">INGREDIENTS</Typography>
          {ingredients?.map(ingredient => (
            <Box key={ingredient} ml={2}>
              <li className={classes.list}>
                <Typography variant="body2" color="textSecondary">
                  {decode(ingredient)}
                </Typography>
              </li>
            </Box>
          ))}
        </Box>
        <Grid container direction="row" justify="center">
          {renderActions(recipe)}
        </Grid>
      </>
    );
  };

  if (recipeDetails.notFound) {
    return <Redirect to="/not-found" />;
  }

  return (
    <div>
      <NavBar />
      <Grid container direction="column" className={classes.container}>
        <Grid item component={Paper} elevation={8}>
          <Grid container direction="row" justify="center" alignItems="center">
            <img
              src={image || defaultImage}
              alt={name}
              className={classes.image}
            />
          </Grid>
          <Grid
            container
            direction="column"
            className={classes.contentContainer}
          >
            {renderContent()}
          </Grid>
        </Grid>
        <Reviews recipeId={id} />
      </Grid>
    </div>
  );
};

export default RecipeDetails;
