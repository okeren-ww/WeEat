import React from 'react';
import {fetchGeoCache, fetchJSON} from "./HttpFetch";
import * as Constants from './Constants';
import {withScriptjs, withGoogleMap, GoogleMap, Marker,} from "react-google-maps";


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: Constants.NEW_YORK_LAT, lng: Constants.NEW_YORK_LON }}>
        <Marker
            position={{lat: props.markerLocation.lat, lng:props.markerLocation.lng}}
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

  handleRestaurantChanged(response){
    console.log(response);
    const location = response.results[0].geometry.location;
    console.log(location.lat);
    this.setState({
      marker: {
        lng: location.lng,
          lat: location.lat,
      }
    });
  }


  componentWillMount(){
    fetchGeoCache('1335 6th Ave, New York, NY 10019').then( response => this.handleRestaurantChanged(response) )
  }

  render() {
    return (
        <div className="map_right">
            <MapWithAMarker
                googleMapURL={Constants.GMAPS_URL}
                markerLocation = {this.state.marker}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
  }
}

export default Map;
