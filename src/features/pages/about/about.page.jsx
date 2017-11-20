import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class AboutPage extends React.Component {
  static isPrivate = false
  render() {
    return (
      <div>
        <h2>About</h2>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return state;
}
export default connect(mapStateToProps)(AboutPage);
