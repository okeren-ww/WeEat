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

class RestaurantsTable extends React.Component {
  constructor() {
    super();
  }

  render() {
    const rows = [];
    this.props.restaurants.forEach((restaurant) => {
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
}

RestaurantsTable.propTypes = {
  restaurants: PropTypes.array,
};


class FilterableRestaurantTable extends React.Component {
  render() {
    let restaurantList = this.props.restaurants;

    if (restaurantList && restaurantList.length > 0) {
      return (
        <RestaurantsTable restaurants = {restaurantList} />
      );
    }
    // error handling
    return (
      <h1>No restaurants found</h1>
    );
  }
}

FilterableRestaurantTable.propTypes = {
  restaurants: PropTypes.array,
};

export default FilterableRestaurantTable;
