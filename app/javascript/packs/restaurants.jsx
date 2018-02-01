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
      filterDelTime: 15,
    };

  componentWillMount() {
    fetchJson(Constants.RESTAURANTS_URL, response => this.setState({ restaurants: response }));
  }

  componentDidMount(){
      document.getElementById('delivery_time_label').innerHTML = this.state.filterDelTime + ' Minutes';

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
    document.getElementById('delivery_time_label').innerHTML = e.target.value + ' Minutes';
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
        <div className="filters_bar">
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
              <DeliveryTimeFilter maxDeliveryTime={this.state.filterDelTime} handleOnMaxDelTimeChange={this.handleOnMaxDelTimeChange} />
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
