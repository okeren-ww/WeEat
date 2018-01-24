import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


class RestaurantRow extends React.Component {
  constructor() {
    super();
  }

  calcStars(rating) {
    let stars = '';
    for (let i = 0; i < rating; i = i + 1) {
      stars = stars + '★';
    }
    return stars;
  }

  render() {
    const restaurant = this.props.restaurant;
    return (
      <tr>
        <td>{restaurant.name}</td>
        <td>{restaurant.address}</td>
        <td align="right"> {this.calcStars(restaurant.rating)}</td>
      </tr>
    );
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
            <th align="left">Name</th>
            <th align="left">Address</th>
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
  constructor() {
    super();
    this.state = {
      restaurants: [],
    };
  }

  componentWillMount() {
    fetch('http://localhost:3000/restaurants.json')
      .then(response => response.json())
      .then(response => this.setState({ restaurants: response }));
  }


  render() {
    let restaurantList = this.state.restaurants;

    if (restaurantList && restaurantList.length > 0) {
      return (
        <RestaurantsTable restaurants = {this.state.restaurants} />
      );
    }
    // error handling
    return (
      <h1>No restaurants found</h1>
    );
  }
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <FilterableRestaurantTable />,
    document.body.appendChild(document.createElement('div')),
  );
});
