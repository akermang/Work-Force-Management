import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import './scss/main.scss';

import Root from './routes/routes.jsx';
import rootReducer from './common/reducers';
import fetchMiddleware from './middlewares/fetch.middleware';

const middlewares = applyMiddleware(thunk, logger, fetchMiddleware);
const store = createStore(rootReducer, middlewares);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
