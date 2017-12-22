import React from "react";
import { withRouter } from "react-router-dom";
import fire from "./fire";

const App = props => (
  <div className="container-fluid">{props.children}</div>
);

export default App;
