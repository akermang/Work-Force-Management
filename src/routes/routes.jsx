import React from 'react';
import PropTypes from 'prop-types';
import { Switch, HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import AuthRoute from './auth-guard.jsx';

import { 
  HomePage, 
  AboutPage, 
  App, 
  LoginPage, 
  TestPage, 
  AddUserForm, 
  TasksComponent, 
  AddTaskForm, 
} from '../features';
import DefaultLayout from './default-layout.jsx';
import FullPageLayout from './full-layout.jsx';

const layouts = {
  default: DefaultLayout,
  full: FullPageLayout
}

const Root = ({ store }) => ({
  render() {
    return (
      <Provider store={store}>
        <Router>
          <App>
            <Switch>
              <AuthRoute exact path="/"     component={HomePage} />                                           
              <AuthRoute path="/task/:id"   component={AddTaskForm} />
              <AuthRoute path="/task/add"   component={AddTaskForm} />                                           
              <AuthRoute path="/user/add"   component={AddUserForm} />                                           
              <DefaultLayout path="/login"  component={LoginPage} />
              <DefaultLayout path="/about"  component={AboutPage} /> 
            </Switch>
          </App>
        </Router>
      </Provider>
    );
  },
});

export default Root;
