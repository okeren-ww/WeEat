import React from 'react';
import PropTypes from 'prop-types';

export class RatingSelect extends React.Component {
  render() {
    return (<div>
      <select onChange={this.props.handleOnChange}>
        <option value="All">All</option>
        <option value="1">★</option>
        <option value="2">★★</option>
        <option value="3">★★★</option>
        <option value="4">★★★★</option>
        <option value="5">★★★★★</option>
      </select>
    </div>);
  }
}

RatingSelect.propTypes = {
  handleOnChange: PropTypes.func,
};

export class TenBisSelect extends React.Component {
  render() {
    return (
      <form>
        <input
          type="checkbox"
          checked={this.props.onlyTenBis}
          onClick={this.props.handleTenBisChange} />
        {' '}Accepts Ten Bis
      </form>
    );
  }
}

TenBisSelect.propTypes = {
  onlyTenBis: PropTypes.bool,
  handleTenBisChange: PropTypes.func,
};

export class CuisineSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cuisines: [],
    };
  }

  componentWillMount() {
    fetch('http://localhost:3000/cuisines.json')
      .then(response => response.json())
      .then(response => this.setState({ cuisines: response }));
  }


  render() {
    let cuisines = this.state.cuisines;
    cuisines.sort(function (a, b) {
      let first = a.name;
      let second = b.name;
      return first > second ? 1 : (first < second ? -1 : 0);
    });


    if (cuisines && cuisines.length > 0) {
      return (
        <div>
          <select onChange={this.props.handleOnChange}>
            <option key="All" value="All">All Cuisines</option>
            {cuisines.map(cuisine =>
              <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>)}
          </select>
        </div>
      );
    }

    return (<div>
      <select onChange={this.props.handleOnChange}>
        <option key="All" value="All">All</option>
      </select>
    </div>);
  }
}

CuisineSelect.propTypes = {
  handleOnChange: PropTypes.func,
};

export class TextFilter extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          onChange={this.props.handleOnFilterTextChange} />
      </div>
    );
  }
}

TextFilter.propTypes = {
  filterText: PropTypes.string,
  handleOnFilterTextChange: PropTypes.func,
};

export class DeliveryTimeFilter extends React.Component {
  render() {
    return (
      <div>
        <input
          type="number"
          placeholder="Max delivery time..."
          value={this.props.maxDeliveryTime}
          onChange={this.props.handleOnMaxDelTimeChange} />
      </div>
    );
  }
}

DeliveryTimeFilter.propTypes = {
  maxDeliveryTime: PropTypes.string,
  handleOnMaxDelTimeChange: PropTypes.func,
};


