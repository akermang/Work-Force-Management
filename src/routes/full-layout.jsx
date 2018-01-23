import React from 'react';
import { Route } from 'react-router-dom';
import { NavComponent } from '../features';
import { withRouter } from 'react-router-dom';
 
export default class FullPageLayout extends React.Component {
  render() {
    const Component = this.props.component;
    return (
      <div className="wrapper full">
        <NavComponent />
        <Component {...rest} />
      </div>
    )
  }
};
