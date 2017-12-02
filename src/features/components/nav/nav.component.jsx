import React from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import styles from "./nav.component.scss";
import { connect } from "react-redux";

const NavComponent = props => ({
  render() {
    const links = this.props.links || [];
    return(
      <ul className={styles.nav}>
      {
        links.map((link, i) => {
          return <li  key={i}><Link  to={link.path}>{link.text}</Link></li>
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

export default connect(mapStateToProps)(NavComponent);
