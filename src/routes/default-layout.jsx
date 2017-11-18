import React from 'react';
import { Route } from 'react-router-dom';
import { HeaderComponent, NavComponent } from '../features';

const DefaultLayout = ({ component: Component, ...rest }) => ({
  render() {
    return (
      <Route
        {...rest}
        render={matchProps => (
          <div>
            <HeaderComponent />
            <div className="wrapper default">
              <NavComponent />
              <Component {...matchProps} />
            </div>
          </div>
        )}
      />
    );
  },
});

export default DefaultLayout;
