import React from 'react';
import * as Constants from './Constants';

class Map extends React.Component {
  render() {
    return (
      <iframe
        width="850"
        height="850"
        frameBorder="0"
        src={Constants.GMAPS_URL} />
    );
  }
}

export default Map;
