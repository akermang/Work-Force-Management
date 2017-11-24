import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import './scss/main.scss';

import Root from './routes/routes.jsx';
import rootReducer from './common/reducers';
import fetchMiddleware from './middlewares/fetch.middleware';
import intiateData from './initiateData';

const middlewares = applyMiddleware(thunk, logger, fetchMiddleware);
const store = createStore(rootReducer, middlewares);

intiateData(store);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
