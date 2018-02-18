import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Routes from '../Routes';
import '../assets/scss/styles.scss';

const App = () => (
  <MuiThemeProvider>
    <Routes />
  </MuiThemeProvider>
);

export default App;
