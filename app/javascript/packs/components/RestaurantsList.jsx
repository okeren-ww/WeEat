import React from 'react';
import PropTypes from 'prop-types';


class RestaurantRow extends React.Component {
  static calcStars(rating) {
    let stars = '';
    for (let i = 0; i < rating; i = i + 1) {
      stars = stars + '★';
    }
    return stars;
  }

  constructor() {
    super();
  }

  render() {
    const restaurant = this.props.restaurant;
    const imagePath = 'images/' + restaurant.cuisine_icon;
    return (<tr>
      <td><img className="cuisine_icon" src={imagePath} alt="Smiley face" height="42" width="42" /></td>
      <td align="left" valign="middle">{restaurant.name}</td>
      <td><img className={restaurant.accepts_ten_bis ? 'accepts_ten_bis' : 'not_accepts_ten_bis'} /></td>
      <td align="right" valign="middle"> {RestaurantRow.calcStars(restaurant.rating)}</td>
    </tr>);
  }
}

RestaurantRow.propTypes = {
  restaurant: PropTypes.object,
};


class FilterableRestaurantTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let restaurantList = this.props.restaurants;
    const filterText = this.props.filterText;
    const filterCuisine = this.props.filterCuisine;
    const filterRating = this.props.filterRating;
    const filterTenBis = this.props.filterTenBis;
    const filterDelTime = this.props.filterDelTime;
    if (filterCuisine !== 'All') {
      restaurantList = restaurantList.filter(function (rest) {
        return parseInt(rest.cuisine_id, 10) === parseInt(filterCuisine, 10);
      });
    }
    if (filterRating !== 'All') {
      restaurantList = restaurantList.filter(function (rest) {
        let ratingFloor = (Math.floor(rest.rating)).toString();
        return ratingFloor === filterRating;
      });
    }
    if (filterText !== '') {
      restaurantList = restaurantList.filter(function (rest) {
        return rest.name.toLowerCase().includes(filterText.toLowerCase());
      });
    }
    if (filterDelTime !== undefined) {
      if (filterDelTime) {
        restaurantList = restaurantList.filter(function (rest) {
          return rest.max_delivery_time < filterDelTime;
        });
      }
    }

    restaurantList = restaurantList.filter(function (rest) {
      if (filterTenBis && rest.accepts_ten_bis) {
        return true;
      }
      return !(filterTenBis && !rest.accepts_ten_bis);
    });


    if (restaurantList && restaurantList.length > 0) {
      const rows = [];
      restaurantList.forEach((restaurant) => {
        rows.push(
          <RestaurantRow
            restaurant = {restaurant}
            key = {restaurant.id}
          />
        );
      });

      return (
        <table>
          <thead>
            <tr>
              <th align="left">Cuisine</th>
              <th align="left">Name</th>
              <th align="left">Ten Bis</th>
              <th align="right">Rating</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      );
    }
    // error handling
    return (
      <h2>No restaurants found</h2>
    );
  }
}

FilterableRestaurantTable.propTypes = {
  restaurants: PropTypes.array,
  filterText: PropTypes.string,
  filterCuisine: PropTypes.string,
  filterRating: PropTypes.string,
  filterTenBis: PropTypes.bool,
  filterDelTime: PropTypes.string,

};

export default FilterableRestaurantTable;
