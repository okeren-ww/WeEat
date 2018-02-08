import React from 'react';
import calcStars from '../lib/Helpers';
import PropTypes from 'prop-types';

export default function Review({ review }) {
  return (
    <div className="review_cell">
      <div className="reviewer_name">
        {review.reviewer_name}
      </div>
      <div className="review_comment">
        {review.comment}
      </div>
      <div className="review_rating">
        {calcStars(review.rating)}
      </div>
    </div>
  );
}

Review.propTypes = {
  review: PropTypes.object.isRequired,
};
