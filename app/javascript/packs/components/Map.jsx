import React from 'react';
import * as Constants from './Constants';
import {withScriptjs, withGoogleMap, GoogleMap, Marker,} from "react-google-maps";


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={Constants.DEFAULT_MAP_ZOOM}
        center={props.markerLocation.lat == null ?
            {lat: Constants.NEW_YORK_LAT, lng: Constants.NEW_YORK_LON} : props.markerLocation}
        >
        <Marker
            position={props.markerLocation}
        />
    </GoogleMap>
));

class Map extends React.Component {
  state = {
    marker: {
        lng: 0,
        lat: 0,
    }
  };

  render() {
    return (
        <div className="map_right">
            <MapWithAMarker
                googleMapURL={Constants.GMAPS_URL}
                markerLocation = {this.props.selectedRestaurant}
                loadingElement={<div className="map_loading_element"/>}
                containerElement={<div className="map_right"/>}
                mapElement={<div className="map_right"/>}
            />
        </div>
    );
  }
}

export default Map;
