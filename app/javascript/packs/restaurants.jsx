import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';


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
        <div>
          <div className="restaurantList">
            <div className="scrollbar" id="style-default">
              {restaurantList.map(restaurant =>
                (<div className="restaurantItem" key={restaurant.name}>
                  <div className="restaurant">
                    {restaurant.rating}  {restaurant.name}<br />
                    {restaurant.address}
                  </div>
                  <div className="cuisine">{restaurant.cuisine_id}</div>
                </div>)
              )}
            </div>
          </div>
        </div>
      );
    }
    // error handling
    return (
      <h1>No restaurants found</h1>
    );
  }

  // render() {
  //     return (
  //         <div>
  //             <SearchBar />
  //             <ProductTable restaurants={this.state.restaurants} />
  //         </div>
  //     );
  // }
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
      <FilterableRestaurantTable />,
    document.body.appendChild(document.createElement('div')),
  );
});
