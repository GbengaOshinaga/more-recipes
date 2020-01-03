import React, { useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
  useStoreContext,
  getIsFetchingRecipeDetails,
  getRecipeDetails
} from '../../hooks/globalStore';
import { decode } from '../../utils';
import useActions from '../../hooks/useActions';
import NavBar from '../common/NavBar';
import Reviews from './Reviews';
import styles from './RecipeDetails.modules.scss';

const RecipeDetails = () => {
  const { recipeDetails, fetchRecipeDetails } = useStoreContext();
  const { id } = useParams();
  const renderActions = useActions();

  const isFetching = getIsFetchingRecipeDetails(recipeDetails);
  const recipe = getRecipeDetails(recipeDetails);

  const { name, image, description, ingredients } = recipe;

  useEffect(() => {
    fetchRecipeDetails(id);
  }, [fetchRecipeDetails, id]);

  const renderContent = () => {
    if (isFetching) {
      return <CircularProgress />;
    }

    return (
      <>
        <Grid item xs={10}>
          <img src={image} alt={name} className={styles.image} />
        </Grid>
        <h1>{decode(name)}</h1>
        <div>
          <h6>Description</h6>
          <p>{decode(description)}</p>
        </div>
        <div>
          <h6>Ingredients</h6>
          {ingredients?.map(ingredient => (
            <li key={ingredient}>{decode(ingredient)}</li>
          ))}
        </div>
        {renderActions(recipe)}
      </>
    );
  };

  if (recipeDetails.notFound) {
    return <Redirect to="/not-found" />;
  }

  return (
    <div>
      <NavBar />
      <Paper className={styles.detailsContainer} elevation={8}>
        <Grid container direction="column">
          {renderContent()}
        </Grid>
      </Paper>
      <Reviews recipeId={id} />
    </div>
  );
};

export default RecipeDetails;
