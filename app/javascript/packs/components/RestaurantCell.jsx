import React from 'react';
import PropTypes from 'prop-types';
import calcStars from '../lib/Helpers';
import PopoutWindow from 'react-popout';
import ReviewsList from './ReviewsList';
import Modal from 'react-responsive-modal';


export class RestaurantCell extends React.Component {
  constructor(props) {
    super(props);
    this.popout = this.popout.bind(this);
    this.popoutClosed = this.popoutClosed.bind(this);
  }

    state = {
      open: false,
    };

    onOpenModal = () => {
      this.setState({ open: true });
    };

    onCloseModal = () => {
      this.setState({ open: false });
    };


    handleClick = () => {
      this.props.handleSelectedRestaurantChange(this.props.restaurant);
    };


    popout() {
      this.setState({ isPoppedOut: true });
    }

    popoutClosed() {
      this.setState({ isPoppedOut: false });
    }

    render() {
      const { open } = this.state;
      const restaurant = this.props.restaurant;
      const imagePath = 'images/' + restaurant.cuisine_icon;
      const popup = (<Modal open={open} onClose={this.onCloseModal} little>
        <div className="reviews_list">
          <ReviewsList restaurant={this.props.restaurant} />
        </div>
      </Modal>);
      return (
        <div className="restaurant_cell" onClick={this.handleClick}>
          {popup}
          <div className="cuisine_icon_div">
            <img className="cuisine_icon" src={imagePath} alt={restaurant.cuisine_icon} />
          </div>
          <div className="restaurant_main_info">
            <div className="restaurant_name">
              {restaurant.name}<br /><br />
            </div>
            <div className="restaurant_address">
                    ~{restaurant.max_delivery_time} Minutes<br />
              {restaurant.address}<br />
            </div>
          </div>
          <div className="restaurant_secondary_info">
            <div className="ten_bis_icon">
              <img className={restaurant.accepts_ten_bis ? 'accepts_ten_bis' : 'not_accepts_ten_bis'} />
            </div>
            <div className="restaurant_rating">
              {calcStars(restaurant.rating)}
            </div>
            <div>
              <button onClick={this.onOpenModal} className="restaurant_reviews_button">Reviews</button>
            </div>
          </div>
        </div>);
    }
}

export function EmptyRestaurantCell() {
  return (
    <div className="restaurant_cell">
      <div className="restaurant_name">
            No Restaurants Found
      </div>
    </div>
  );
}

RestaurantCell.propTypes = {
  restaurant: PropTypes.object.isRequired,
  handleSelectedRestaurantChange: PropTypes.func,
};
