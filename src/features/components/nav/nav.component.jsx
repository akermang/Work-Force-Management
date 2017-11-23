import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.component.scss';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { LOGOUT_ACTION, logoutActivate } from "../../../common/state/auth/auth.actions";




const NavComponent = (props) => (
  <ul className={styles.nav}>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/login" onClick={() => {props.dispatch({type: LOGOUT_ACTION})}}>Sign Out </Link></li>
  </ul>
);

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps)(NavComponent));
