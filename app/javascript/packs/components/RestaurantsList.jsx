import React from 'react';
import PropTypes from 'prop-types';
import {RestaurantCell, EmptyRestaurantCell} from './RestaurantCell';

class FilterableRestaurantTable extends React.Component {
  render() {
    let restaurantList = this.props.restaurants;
    const {
      filterText = this.props.filterText,
      filterCuisine = this.props.filterCuisine,
      filterRating = this.props.filterRating,
      filterTenBis = this.props.filterTenBis,
      filterDelTime = this.props.filterDelTime,
    } = this.props;

    let filtersArray = [];
    if (filterCuisine !== 'All') {
      filtersArray.push(function (rest) {
        return parseInt(rest.cuisine_id, 10) === parseInt(filterCuisine, 10);
      });
    }

    if (filterRating !== 'All') {
      filtersArray.push(function (rest) {
        let ratingFloor = (Math.floor(rest.rating)).toString();
        return ratingFloor >= filterRating;
      });
    }
    if (filterText !== '') {
      filtersArray.push(function (rest) {
        return rest.name.toLowerCase().includes(filterText.toLowerCase());
      });
    }
    if (filterDelTime !== undefined) {
      if (filterDelTime) {
        filtersArray.push(function (rest) {
          return rest.max_delivery_time < filterDelTime;
        });
      }
    }

    filtersArray.push(function (rest) {
      if (filterTenBis && rest.accepts_ten_bis) {
        return true;
      }
      return !(filterTenBis && !rest.accepts_ten_bis);
    });

    function applyFilter(filter) {
        restaurantList = restaurantList.filter(filter);
    }
    filtersArray.map(applyFilter);

    if (restaurantList && restaurantList.length > 0) {
      const rows = [];
      restaurantList.forEach((restaurant) => {
        rows.push(
          <RestaurantCell
            restaurant = {restaurant}
            key = {restaurant.id}
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

FilterableRestaurantTable.propTypes = {
  restaurants: PropTypes.array.isRequired,
  filterText: PropTypes.string,
  filterCuisine: PropTypes.string,
  filterRating: PropTypes.string,
  filterTenBis: PropTypes.bool,
  filterDelTime: PropTypes.string,
};

export default FilterableRestaurantTable;
