import React from 'react';
import ReactDOM from 'react-dom';
import FilterableRestaurantTable from './components/RestaurantsList';
import Map from './components/Map';
import { TenBisSelect, RatingSelect, CuisineSelect, TextFilter, DeliveryTimeFilter } from './components/Filters';
import * as Constants from './components/Constants';
import fetchJson from './components/HttpFetch';

class RestaurantsContainer extends React.Component {
  state = {
      restaurants: [],
      filterText: '',
      filterTenBis: false,
      filterRating: 'All',
      filterCuisine: 'All',
    };

  componentWillMount() {
    fetchJson(Constants.RESTAURANTS_URL, response => this.setState({ restaurants: response }));
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
      <div className="div_body">
        <div className="banner">
          <h1>WeEat</h1>
          <div>
            <TextFilter handleOnFilterTextChange = {this.handleOnTextFilterChange} />
          </div>
        </div>
        <div className="filters">
          <div className="filter">
              <label className="filter_labels"> Select Cuisine </label>
              <CuisineSelect handleOnChange={this.handleOnChangeCuisine} />
          </div>
          <div className="filter">
              <label className="filter_labels"> Select Minimum Rating </label>
              <RatingSelect handleOnChange={this.handleOnChangeRating} />
          </div>
          <div className="filter">
              <label className="filter_labels"> Select Max Delivery Time </label>
              <DeliveryTimeFilter handleOnMaxDelTimeChange={this.handleOnMaxDelTimeChange} />
          </div>
          <div className="filter_ten_bis">
              <label className="filter_labels"> Only Ten Bis </label>
              <TenBisSelect handleTenBisChange={this.handleOnTenBisChange} />
          </div>
      </div>
      <div className="restaurants_container">
          <div className="restaurants_list">
            <FilterableRestaurantTable
              restaurants = {this.state.restaurants}
              filterText = {this.state.filterText}
              filterCuisine = {this.state.filterCuisine}
              filterRating = {this.state.filterRating}
              filterTenBis = {this.state.filterTenBis}
              filterDelTime = {this.state.filterDelTime}
            />
          </div>
          <Map />
        </div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {

    const newDiv = document.createElement("div");
    newDiv.className = "body_div";
    document.body.appendChild(newDiv);
    ReactDOM.render(
      <RestaurantsContainer />,
        newDiv)
});
