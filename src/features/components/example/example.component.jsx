import React from 'react';
import PropTypes from 'prop-types';


const ExampleComponent = (props) => (
  <div>_Data From Server:
    {
      props.data.map((prop, i) => {
        return <div key={i}>{prop.example}</div>
      })
    }
  </div>
);

export default ExampleComponent;