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

    return (<div>
      <select onChange={this.props.handleOnChange}>
        {options}
      </select>
    </div>);
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
                Accepts Ten Bis
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
        <div>
          <select onChange={this.props.handleOnChange}>
            <option key="All" value="All">All Cuisines</option>
              if(cuisines && cuisines.length > 0){
              cuisines.map(cuisine =>
                <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>)
            }
          </select>
        </div>
      );
    }
}

CuisineSelect.propTypes = {
  handleOnChange: PropTypes.func,
};

export function TextFilter({ filterText, handleOnFilterTextChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={filterText}
        onChange={handleOnFilterTextChange} />
    </div>
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
        type="number"
        placeholder="Max delivery time..."
        value={maxDeliveryTime}
        onChange={handleOnMaxDelTimeChange} />
    </div>
  );
}

DeliveryTimeFilter.propTypes = {
  maxDeliveryTime: PropTypes.string,
  handleOnMaxDelTimeChange: PropTypes.func,
};


