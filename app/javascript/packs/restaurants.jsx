import React from 'react';
import ReactDOM from 'react-dom';
import FilterableRestaurantTable from './components/RestaurantsList';
import Header from './components/Header';
import Map from './components/Map';

class RestaurantsContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      restaurants: [],
      filterText: '',
      onlyTenBis: false,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleTenBisChange = this.handleTenBisChange.bind(this);
  }

  componentWillMount() {
    fetch('http://localhost:3000/restaurants.json')
      .then(response => response.json())
      .then(response => this.setState({ restaurants: response }));
  }


  handleFilterTextChange(filterText) {
    this.setState({
      filterText: filterText,
    });
  }

  handleTenBisChange(onlyTenBis) {
    this.setState({
        onlyTenBis: onlyTenBis,
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div className="rowC">
          <div className="RestaurantsLeft">
            <FilterableRestaurantTable
              restaurants = {this.state.restaurants}
              filterText = {this.state.filterText}
              onlyTenBis = {this.state.onlyTenBis}
              onFilterTextChange={this.handleFilterTextChange}
              onTenBisChange={this.handleTenBisChange}
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
