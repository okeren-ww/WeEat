import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class RestaurantCuisineRow extends React.Component {
  render() {
    const cuisine = this.props.cuisine;
    return (
      <tr>
        <th colSpan="2" align="left">
            <u>{cuisine}</u>
        </th>
      </tr>
    );
  }
}

RestaurantCuisineRow.propTypes = {
  cuisine: PropTypes.string,
};

class RestaurantRow extends React.Component {
  render() {
    const restaurant = this.props.restaurant;
    const name = restaurant.accepts_ten_bis ?
      restaurant.name :
      (<span style={{ color: 'red' }}>
        {restaurant.name}
      </span>);

    return (
      <tr>
        <td>{name}</td>
        <td>{restaurant.max_delivery_time} minutes</td>
      </tr>
    );
  }
}

RestaurantRow.propTypes = {
  restaurant: PropTypes.object,
};

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCuisine = null;

    this.props.restaurants.forEach((restaurant) => {
      if (restaurant.cuisine !== lastCuisine) {
        rows.push(
          <RestaurantCuisineRow
            cuisine={restaurant.cuisine}
            key={restaurant.cuisine} />
        );
        rows.push(
          <RestaurantRow
            restaurant={restaurant}
            key={restaurant.name} />
        );
        lastCuisine = restaurant.cuisine;
      }
    });

    return (
      <table>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

RestaurantRow.propTypes = {
  restaurants: PropTypes.array,
};

class SearchBar extends React.Component {
  render() {
    return (
      <form>
        <input type="text" placeholder="Search..." />
        <p>
          <input type="checkbox" />
          {' '}
                    Only Show Restaurants That Accept 10bis
        </p>
      </form>
    );
  }
}

class FilterableRestaurantTable extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ProductTable restaurants={this.props.restaurants} />
      </div>
    );
  }
}

FilterableRestaurantTable.propTypes = {
  restaurants: PropTypes.array,
};


const PRODUCTS = [
  { category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football' },
  { category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball' },
  { category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball' },
  { category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch' },
  { category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5' },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' },
];

const RESTAURANTS = [
  { name: 'Joseph & Sons', cuisine: 'British', rating: 4, accepts_ten_bis: true, max_delivery_time: 20 },
  { name: 'Vitrina', cuisine: 'American', rating: 4, accepts_ten_bis: false, max_delivery_time: 20 },
  { name: 'Container', cuisine: 'Humous', rating: 4, accepts_ten_bis: true, max_delivery_time: 5 },
  { name: 'Healthy: Israeli Salad', cuisine: 'Salad', rating: 3, accepts_ten_bis: true, max_delivery_time: 15 },
];

ReactDOM.render(
  <FilterableRestaurantTable restaurants={RESTAURANTS} />,
  document.getElementById('container')
);
