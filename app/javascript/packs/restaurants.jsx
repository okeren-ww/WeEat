import React from 'react';
import ReactDOM from 'react-dom';
import FilterableRestaurantList from './components/RestaurantsList';
import Map from './components/Map';
import { TextFilter, FilterBar } from './components/Filters';
import * as Constants from './components/Constants';
import { fetchJSON, fetchGeoCache } from './lib/HttpFetch';

class RestaurantsContainer extends React.Component {
  state = {
    restaurants: [],
    filterText: '',
    filterTenBis: false,
    filterRating: 'All',
    filterCuisine: 'All',
    filterDelTime: Constants.DEFAULT_DELIVERY_TIME,
    marker: null,
  };

  componentWillMount() {
    fetchJSON(Constants.RESTAURANTS_URL + '.json').then(response => this.setRestaurantsFromJson(response));
  }

  setRestaurantsFromJson = (response) => {
    this.setState({
      restaurants: response,
    });
  };

  setRestaurantMarker(response) {
    const location = response.results[0].geometry.location;
    this.setState({
      marker: {
        lng: location.lng,
        lat: location.lat,
      },
    });
  }

  handleOnTextFilterChange = (e) => {
    this.setState({
      filterText: e.target.value,
    });
  };

  handleOnTenBisChange = (e) => {
    this.setState({
      filterTenBis: e.target.checked,
    });
  };

  handleOnChangeRating = (e) => {
    this.setState({
      filterRating: e.target.value,
    });
  };

  handleOnChangeCuisine = (e) => {
    this.setState({
      filterCuisine: e.target.value,
    });
  };

  handleOnMaxDelTimeChange = (e) => {
    this.setState({
      filterDelTime: parseInt(e.target.value, 10),
    });
  };


  handleSelectedRestaurantChange = (e) => {
    fetchGeoCache(e.address).then(response => this.setRestaurantMarker(response));
  };

  render() {
    return (
      <div>
        <div className="banner">
          <h1>WeEat</h1>
          <div>
            <TextFilter handleOnFilterTextChange = {this.handleOnTextFilterChange} />
          </div>
        </div>
        <FilterBar handleOnChangeCuisine={this.handleOnChangeCuisine}
          handleOnChangeRating={this.handleOnChangeRating}
          handleOnMaxDelTimeChange={this.handleOnMaxDelTimeChange}
          handleOnTenBisChange={this.handleOnTenBisChange}
          filterDelTime={this.state.filterDelTime} />

        <div className="restaurants_container">
          <div className="restaurants_list">
            <FilterableRestaurantList
              restaurants={this.state.restaurants}
              filterText={this.state.filterText}
              filterCuisine={this.state.filterCuisine}
              filterRating={this.state.filterRating}
              filterTenBis={this.state.filterTenBis}
              filterDelTime={this.state.filterDelTime}
              handleSelectedRestaurantChange={this.handleSelectedRestaurantChange}
            />
          </div>
          <Map selectedRestaurant = {this.state.marker} />
        </div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const newDiv = document.createElement('div');
  newDiv.className = 'body_div';
  document.body.appendChild(newDiv);
  ReactDOM.render(
    <RestaurantsContainer />,
    newDiv);
});
