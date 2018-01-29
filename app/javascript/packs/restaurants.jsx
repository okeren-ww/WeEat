import React from 'react';
import ReactDOM from 'react-dom';
import FilterableRestaurantTable from './components/RestaurantsList';
import Map from './components/Map';
import { TenBisSelect, RatingSelect, CuisineSelect, TextFilter, DeliveryTimeFilter } from './components/Filters';

class RestaurantsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      filterText: '',
      filterTenBis: false,
      filterRating: 'All',
      filterCuisine: 'All',
    };
  }

  componentWillMount() {
    fetch('http://localhost:3000/restaurants.json')
      .then(response => response.json())
      .then(response => this.setState({ restaurants: response }));
  }


  handleOnTextFilterChange(e) {
    this.setState({
      filterText: e.target.value,
    });
  }

  handleOnTenBisChange(e) {
    this.setState({
      filterTenBis: e.target.checked,
    });
  }

  handleOnChangeRating(e) {
    this.setState({
      filterRating: e.target.value,
    });
  }

  handleOnChangeCuisine(e) {
    this.setState({
      filterCuisine: e.target.value,
    });
  }

  handleOnMaxDelTimeChange(e) {
    this.setState({
      filterDelTime: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <div className="banner">
          <div className="filters">
            <TextFilter handleOnFilterTextChange = {this.handleOnTextFilterChange.bind(this)} />
            <CuisineSelect handleOnChange={this.handleOnChangeCuisine.bind(this)} />
            <RatingSelect handleOnChange={this.handleOnChangeRating.bind(this)} />
            <DeliveryTimeFilter handleOnMaxDelTimeChange={this.handleOnMaxDelTimeChange.bind(this)} />
            <TenBisSelect handleTenBisChange={this.handleOnTenBisChange.bind(this)} />
          </div>
        </div>

        <div className="RestaurantsContainer">
          <div className="RestaurantsLeft">
            <FilterableRestaurantTable
              restaurants = {this.state.restaurants}
              filterText = {this.state.filterText}
              filterCuisine = {this.state.filterCuisine}
              filterRating = {this.state.filterRating}
              filterTenBis = {this.state.filterTenBis}
              filterDelTime = {this.state.filterDelTime}
            />
          </div>
          <div className="MapRight">
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
