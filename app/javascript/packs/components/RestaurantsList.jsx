import React from 'react';
import PropTypes from 'prop-types';
import { RestaurantCell, EmptyRestaurantCell } from './RestaurantCell';
import runFiltersOnRestaurant from '../lib/FiltersHelper';


class FilterableRestaurantsList extends React.Component {
  render() {
    const {
      filterText = this.props.filterText,
      filterCuisine = this.props.filterCuisine,
      filterRating = this.props.filterRating,
      filterTenBis = this.props.filterTenBis,
      filterDelTime = this.props.filterDelTime,
    } = this.props;

    let restaurantList = runFiltersOnRestaurant(this.props.restaurants,
      { filterText, filterCuisine, filterRating, filterTenBis, filterDelTime });

    if (restaurantList && restaurantList.length > 0) {
      const rows = [];
      restaurantList.forEach((restaurant) => {
        rows.push(
          <RestaurantCell
            restaurant = {restaurant}
            key = {restaurant.id}
            handleSelectedRestaurantChange = {this.props.handleSelectedRestaurantChange}
          />
        );
      });
      return (rows);
    }
    // error handling
    return (
      <EmptyRestaurantCell />
    );
  }
}

FilterableRestaurantsList.propTypes = {
  restaurants: PropTypes.array.isRequired,
  filterText: PropTypes.string,
  filterCuisine: PropTypes.string,
  filterRating: PropTypes.string,
  filterTenBis: PropTypes.bool,
  filterDelTime: PropTypes.number,
  handleSelectedRestaurantChange: PropTypes.func,
};

export default FilterableRestaurantsList;
