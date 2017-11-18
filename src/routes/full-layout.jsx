import React from 'react';
import { Route } from 'react-router-dom';
import { NavComponent } from '../features';

const FullPageLayout = ({ component: Component, ...rest }) => ({
  render() {
    return (
      <Route
        {...rest}
        render={matchProps => (
          <div className="wrapper full">
            <NavComponent />
            <Component {...matchProps} />
          </div>
        )}
      />
    );
  },
});

export default FullPageLayout;
