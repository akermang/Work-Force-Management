import React from 'react';
import PropTypes from 'prop-types';
import { Switch, HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import { HomePage, AboutPage, App, LoginPage } from '../features';
import DefaultLayout from './default-layout.jsx';
import FullPageLayout from './full-layout.jsx';

const Root = ({ store }) => ({
  render() {
    return (
      <Provider store={store}>
        <Router>
          <App>
            <DefaultLayout exact path="/" component={HomePage} />
            <DefaultLayout path="/about" component={AboutPage} />
            <DefaultLayout path="/login" component={LoginPage} />
          </App>
        </Router>
      </Provider>
    );
  },
});

export default Root;
