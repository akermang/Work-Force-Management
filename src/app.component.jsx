import React from "react";
import { withRouter } from 'react-router-dom';

const App = props => (
  <div className="container-fluid">{props.children}</div>
);

export default withRouter(App);
