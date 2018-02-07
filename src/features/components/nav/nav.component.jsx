import React from "react";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import styles from "./nav.component.scss";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';

const NavComponent = props => ({
  render() {
    const links = this.props.links || [];
    return(
      <ul className={styles.nav + " lead"}>
      {
        links.map((link, i) => {
          if(link.path == "/") {
            return <li  key={i}><NavLink exact activeClassName={styles.active} to={link.path}>{link.text}</NavLink></li>
          }else {
            return <li  key={i}><NavLink activeClassName={styles.active} to={link.path}>{link.text}</NavLink></li>
          }
          
        })
      }
    </ul>
    )
  }
});

// expects to recieve array with objects as follows:
// [ {path: '/somepath', text: 'some text'} ]

NavComponent.propTypes = {
  links: PropTypes.array.isRequired
}

function mapStateToProps(state) {
  return state;
}

export default withRouter(connect(mapStateToProps)(NavComponent));
