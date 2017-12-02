import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import styles from "./about.page.scss";

class AboutPage extends React.Component {
  render() {
    return (
      <div className={styles.about}>
        <article className={styles.cont}>
          <h2 className="h2">About</h2>
          <h3>
            Easy to use WFM apliction – Web-based for Desktop computers and
            Mobile
          </h3>
          <span>
            One system to track time and/or jobs for all employee types– Exempt,
            Non-exempt, Hourly, Union Workers etc. Log time and approve from
            anywhere in the office or in the field.
          </span>
          <h3>Software Developer </h3>
          <h3>Gal Ackerman 2017</h3>
        </article>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(AboutPage);
