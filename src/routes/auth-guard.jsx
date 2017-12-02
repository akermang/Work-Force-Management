import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DefaultLayout from './default-layout.jsx'
import FullPageLayout from './full-layout.jsx';

const AuthRoute = ({component, ...props}) => {    
  const Layout = props.layout || DefaultLayout;
  console.log(component)
  if (props.isAuthenticated) {
    return <Layout { ...props } component={ component } />;    
  }else {
    return <Redirect to={ '/login' } />;
  }
};

AuthRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  isAuthenticated: PropTypes.bool
};

function mapStateToProps(state) {
  return {isAuthenticated: state.authReducer.isAuthenticated};
}

export default withRouter(connect(mapStateToProps)(AuthRoute));
