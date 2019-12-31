import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import Routes from '../Routes';
import { StoreProvider } from '../hooks/globalStore';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import '../styles/reset.scss';
import '../styles/global.scss';

const App = () => (
  <ToastProvider>
    <StoreProvider>
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </StoreProvider>
  </ToastProvider>
);

export default App;
