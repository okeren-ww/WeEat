import React from 'react';
import ReactDOM from 'react-dom';
import FilterableRestaurantTable from './components/RestaurantsList';
import Map from './components/Map';
import { TenBisSelect, RatingSelect, CuisineSelect, TextFilter, DeliveryTimeFilter } from './components/Filters';
import * as Constants from './components/Constants';

class RestaurantsContainer extends React.Component {
  state = {
    restaurants: [],
    filterText: '',
    filterTenBis: false,
    filterRating: 'All',
    filterCuisine: 'All',
  };

  componentWillMount() {
    fetch(Constants.RESTAURANTS_URL)
      .then(response => response.json())
      .then(response => this.setState({ restaurants: response }));
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
      filterDelTime: e.target.value,
    });
  };

  render() {
    return (
      <div>
        <div className="banner">
          <div className="filters">
            <TextFilter handleOnFilterTextChange = {this.handleOnTextFilterChange} />
            <CuisineSelect handleOnChange={this.handleOnChangeCuisine} />
            <RatingSelect handleOnChange={this.handleOnChangeRating} />
            <DeliveryTimeFilter handleOnMaxDelTimeChange={this.handleOnMaxDelTimeChange} />
            <TenBisSelect handleTenBisChange={this.handleOnTenBisChange} />
          </div>
        </div>

        <div className="restaurants_container">
          <div className="restaurants_left">
            <FilterableRestaurantTable
              restaurants = {this.state.restaurants}
              filterText = {this.state.filterText}
              filterCuisine = {this.state.filterCuisine}
              filterRating = {this.state.filterRating}
              filterTenBis = {this.state.filterTenBis}
              filterDelTime = {this.state.filterDelTime}
            />
          </div>
          <div className="map_right">
            <Map />
          </div>
        </div>

      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <RestaurantsContainer />,
    document.body.appendChild(document.createElement('div')),
  );
});
