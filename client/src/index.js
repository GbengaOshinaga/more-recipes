import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { sessionService } from 'redux-react-session';
import configureStore from './store/configureStore';
import App from './components/App';
import { getFavourites } from './actions/userActions';

const store = configureStore();

const options = { refreshOnCheckAuth: true, redirectPath: '/home', driver: 'COOKIES' };
sessionService.initSessionService(store, options);
sessionService.loadSession()
  .then((token) => {
    store.dispatch(getFavourites(token));
  });

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
