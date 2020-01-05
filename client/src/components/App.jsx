import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Routes from '../Routes';
import { StoreProvider } from '../hooks/globalStore';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import '../styles/reset.scss';
import '../styles/global.scss';

const theme = createMuiTheme({
  palette: { primary: { main: '#E23D28' }, secondary: { main: '#0070BB' } }
});

const App = () => (
  <ToastProvider>
    <StoreProvider>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <Routes />
        </ErrorBoundary>
      </ThemeProvider>
    </StoreProvider>
  </ToastProvider>
);

export default App;
