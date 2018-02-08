import React from 'react';
import PropTypes from 'prop-types';
import calcStars from '../lib/Helpers';
import PopoutWindow from 'react-popout';
import ReviewsList from './ReviewsList';

export class RestaurantCell extends React.Component {
  constructor(props) {
    super(props);
    this.popout = this.popout.bind(this);
    this.popoutClosed = this.popoutClosed.bind(this);
    this.state = { isPoppedOut: false };
  }

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
      const restaurant = this.props.restaurant;
      const imagePath = 'images/' + restaurant.cuisine_icon;
      const popup = (<PopoutWindow title="Window title" onClosing={this.popoutClosed}>
        <ReviewsList restaurant={this.props.restaurant} />
      </PopoutWindow>);
      if (this.state.isPoppedOut) {
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
              <div className="restaurant_reviews_button">
                <button onClick={this.popout}>Click Me</button>
              </div>
            </div>
          </div>

        );
      }

      return (
        <div className="restaurant_cell" onClick={this.handleClick}>
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
            <div className="restaurant_reviews_button">
              <button onClick={this.popout}>Click Me</button>
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
