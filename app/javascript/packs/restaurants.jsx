import React from 'react';
import ReactDOM from 'react-dom';
import FilterableRestaurantTable from './components/RestaurantsList';
import Map from './components/Map';
import { TenBisSelect, RatingSelect, CuisineSelect, TextFilter } from './components/Filters';

class RestaurantsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      filterText: '',
      onlyTenBis: false,
      ratingFilter: 'All',
      cuisineFilter: 'All',
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
      onlyTenBis: e.target.checked,
    });
  }

  handleOnChangeRating(e) {
    this.setState({
      ratingFilter: e.target.value,
    });
  }

  handleOnChangeCuisine(e) {
    this.setState({
      cuisineFilter: e.target.value,
    });
  }

  render() {
    return (
      <div>
        <div className="Filters">
          <TextFilter handleOnFilterTextChange = {this.handleOnTextFilterChange.bind(this)} />
          <CuisineSelect handleOnChange={this.handleOnChangeCuisine.bind(this)} />
          <RatingSelect handleOnChange={this.handleOnChangeRating.bind(this)} />
          <TenBisSelect handleTenBisChange={this.handleOnTenBisChange.bind(this)} />
        </div>
        <div className="RestaurantsContainer">
          <div className="RestaurantsLeft">
            <FilterableRestaurantTable
              restaurants = {this.state.restaurants}
              filterText = {this.state.filterText}
              filterCuisine = {this.state.cuisineFilter}
              filterRating = {this.state.ratingFilter}
              filterTenBis = {this.state.onlyTenBis}
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
