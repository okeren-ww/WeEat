import React from 'react';
import * as Constants from './Constants';

class Map extends React.Component {
  render() {
    return (
      <iframe className="map_right"

        frameBorder="0"
        src={Constants.GMAPS_URL} />
    );
  }
}

export default Map;
