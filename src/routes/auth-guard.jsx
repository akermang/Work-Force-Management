import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthRoute = ({component, ...props}) => {  
  if (props.isAuthenticated) {
    return <Route { ...props } component={ component } />;    
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
