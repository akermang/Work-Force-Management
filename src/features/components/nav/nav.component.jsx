import React from 'react';
import { Link } from 'react-router-dom';
import styles from './nav.component.scss';

const NavComponent = () => (
  <ul className={styles.nav}>
    <li><Link to="/">Home</Link></li>
    <li><Link to="/about">About</Link></li>
    <li><Link to="/login">Login</Link></li>
  </ul>
);

export default NavComponent;
