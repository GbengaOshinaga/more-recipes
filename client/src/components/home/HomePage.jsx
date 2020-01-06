import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '../common/Link';
import { getIsUserAuthenticated } from '../../hooks/globalStore';
import styles from './HomePageStyles';

const HomePage = () => {
  const history = useHistory();
  const classes = styles();

  const navigateToCatalog = () => history.push('/catalog');

  if (getIsUserAuthenticated()) {
    return <Redirect to="/catalog" />;
  }

  const renderLink = (to, text) => {
    return (
      <Box m={2}>
        <Link to={to} className={classes.text}>
          {text}
        </Link>
      </Box>
    );
  };

  return (
    <Container direction="column" className={classes.image}>
      <Grid container justify="flex-end">
        {renderLink('/signin', 'Sign In')}
        {renderLink('/signup', 'Sign Up')}
      </Grid>
      <Box mt={18}>
        <Grid container direction="column" alignItems="center">
          <Typography variant="h3" align="center" className={classes.text}>
            Welcome to More-Recipes
          </Typography>
          <Box m={2} width={600}>
            <Typography variant="h6" align="center" className={classes.text}>
              A platform for sharing recipe ideas you invented or learnt. Find
              innovative recipes or share one of your own.
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={navigateToCatalog}
            color="primary"
          >
            VIEW CATALOG
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
