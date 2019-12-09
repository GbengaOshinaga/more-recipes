import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Routes from '../Routes';
import '../assets/scss/styles.scss';

const App = () => (
  <ToastProvider>
    <MuiThemeProvider>
      <Routes />
    </MuiThemeProvider>
  </ToastProvider>
);

export default App;
