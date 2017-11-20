import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.component.scss';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';


const NavComponent = () => (
  <ul className={styles.nav}>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/login">Login</Link></li>
  </ul>
);

function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(NavComponent);
