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
        if(this.props.onlyTenBis && !restaurant.accepts_ten_bis){
            return;
        }

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


class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleOnlyTenBisChange = this.handleOnlyTenBisChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  handleOnlyTenBisChange(e) {
    this.props.onTenBisChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.handleFilterTextChange} />
        <p>
          <input
            type="checkbox"
            checked={this.props.onlyTenBis}
            onChange={this.handleOnlyTenBisChange} />
          {' '}
                Only show Restaurants that accept ten bis
        </p>
      </form>
    );
  }
}

class FilterableRestaurantTable extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleOnlyTenBisChange = this.handleOnlyTenBisChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e);
    }

    handleOnlyTenBisChange(e) {
        this.props.onTenBisChange(e);
    }
    render() {
    let restaurantList = this.props.restaurants;
    let filterText = this.props.filterText;

    if (restaurantList && restaurantList.length > 0) {
      return (
        <div>
          <FilterBar filterText = {filterText}
            onlyTenBis = {this.props.onlyTenBis}
                     onFilterTextChange = {this.handleFilterTextChange}
                     onTenBisChange = {this.handleOnlyTenBisChange}
          />
          <RestaurantsTable
            restaurants = {restaurantList}
            onlyTenBis = {this.props.onlyTenBis} />
        </div>
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
