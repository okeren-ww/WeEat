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

  render() {
    const restaurant = this.props.restaurant;
    const imagePath = 'images/' + restaurant.cuisine_icon;
    return (
        <div className="restaurant_cell">
          <div className="cuisine_icon_div">
              <img className="cuisine_icon" src={imagePath} alt={restaurant.cuisine_icon} />
          </div>
          <div className="restaurant_main_info">
              {restaurant.name}<br/><br/>
              Delivery Time: {restaurant.max_delivery_time} Minutes<br/>
              {restaurant.address}<br/>
          </div>
          <div className="restaurant_secondary_info">
            <div className="ten_bis_icon">
                <img className={restaurant.accepts_ten_bis ? 'accepts_ten_bis' : 'not_accepts_ten_bis'} />
            </div>
            <div className="restaurant_rating">
                {RestaurantRow.calcStars(restaurant.rating)}
            </div>
          </div>
        </div>
    );
  }
}

RestaurantRow.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

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
        return ratingFloor === filterRating;
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
          <RestaurantRow
            restaurant = {restaurant}
            key = {restaurant.id}
          />
        );
      });

      return (rows);
    }
    // error handling
    return (
      <h2>No restaurants found</h2>
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
