import React, { Suspense } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

export default function SuspenseWrapper(Component) {
  return class extends React.Component {
    render() {
      return (
        <Suspense
          fallback={
            <Grid container justify="center" alignItems="center">
              <CircularProgress />
            </Grid>
          }
        >
          <Component />
        </Suspense>
      );
    }
  };
}
