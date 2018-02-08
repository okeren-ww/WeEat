import React from 'react';
import { fetchJSON } from '../lib/HttpFetch';
import * as Constants from './Constants';
import ReviewCell from './ReviewCell';
import PropTypes from "prop-types";

export default class ReviewsList extends React.Component {
    state = {
      reviews: [],
    };

    componentWillMount() {
      fetchJSON(Constants.RESTAURANTS_URL + '/' + this.props.restaurant.id + '/reviews')
        .then(response => this.setReviewsFromJson(response));
    }

    setReviewsFromJson = (response) =>{
      this.setState({
        reviews: response,
      });
    };

    render() {
      let reviewElements = [];
      let reviewList = [...this.state.reviews];
      reviewList.forEach((review) => {
        reviewElements.push(
          <ReviewCell
            review = {review} />
        );
      });
      return reviewElements;
    }
}

ReviewsList.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

