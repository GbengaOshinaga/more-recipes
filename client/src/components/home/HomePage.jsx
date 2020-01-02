import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { getIsUserAuthenticated } from '../../hooks/globalStore';
import NavBar from '../common/NavBar';

const HomePage = () => {
  const history = useHistory();

  const navigateToCatalog = () => history.push('/catalog');

  if (getIsUserAuthenticated()) {
    return <Redirect to="/catalog" />;
  }

  return (
    <div>
      <NavBar />
      <Grid container>
        <Grid item xs={10}>
          <Typography variant="body1">Welcome to More-Recipes</Typography>
          <Typography variant="body2">
            A platform for sharing recipe ideas you invented or learnt. Find
            innovative recipes or share one of your own.
          </Typography>
          <Button variant="contained" onClick={navigateToCatalog}>
            VIEW CATALOG
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
