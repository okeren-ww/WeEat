import React from 'react';
import PropTypes from 'prop-types';
import * as Constants from './Constants';
import fetchJson from "./HttpFetch";

export class RatingSelect extends React.Component {
  render() {
    const options = [];
    options.push(<option key="All" value="All">All</option>);
    for (let i = 1; i <= 5; i = i + 1) {
      options.push(<option key={i} value={i}>{'★'.repeat(i)}</option>);
    }

    return (
            <select onChange={this.props.handleOnChange}>
            {options}
            </select>
    );
  }
}

RatingSelect.propTypes = {
  handleOnChange: PropTypes.func,
};

export function TenBisSelect({ onlyTenBis, handleTenBisChange }) {
    return (
      <form>
        <input
          type="checkbox"
        checked={onlyTenBis}
        onClick={handleTenBisChange} />
      </form>
    );
}
TenBisSelect.propTypes = {
  onlyTenBis: PropTypes.bool,
  handleTenBisChange: PropTypes.func,
};

export class CuisineSelect extends React.Component {
    state = {
      cuisines: [],
    };

  componentWillMount() {
        fetchJson(Constants.CUISINES_URL, response => this.setState({ cuisines: response }));
  }

  render() {
      let cuisines = [...this.state.cuisines].sort(function (a, b) {
      let first = a.name;
      let second = b.name;
      return first > second ? 1 : (first < second ? -1 : 0);
    });

      return (
          <select onChange={this.props.handleOnChange}>
            <option key="All" value="All">All Cuisines</option>
              if(cuisines && cuisines.length > 0) {
              cuisines.map(cuisine =>
                <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>
              )
            }
          </select>
      );
    }
}

CuisineSelect.propTypes = {
  handleOnChange: PropTypes.func,
};

export function TextFilter({ filterText, handleOnFilterTextChange }) {
    return (
        <input
            type="text"
            placeholder="Search..."
            value={filterText}
            onChange={handleOnFilterTextChange}
            className="search_box" />
    );
}

TextFilter.propTypes = {
  filterText: PropTypes.string,
  handleOnFilterTextChange: PropTypes.func,
};

export function DeliveryTimeFilter({ maxDeliveryTime, handleOnMaxDelTimeChange }) {
    return (
      <div>
        <input
            className="max_delivery_time"
          type="number"
          placeholder="Max delivery time..."
          min={0}
          step={5}
        value={maxDeliveryTime}
        onChange={handleOnMaxDelTimeChange} />
      </div>
    );
}

DeliveryTimeFilter.propTypes = {
  maxDeliveryTime: PropTypes.string,
  handleOnMaxDelTimeChange: PropTypes.func,
};