import React from "react";
import PropTypes from "prop-types";

export class RestaurantCell extends React.Component {
    static calcStars(rating) {
        let stars = '';
        for (let i = 0; i < rating; i = i + 1) {
            stars = stars + '★';
        }
        return stars;
    }

    handleClick = () => {
        this.props.handleSelectedRestaurantChange(this.props.restaurant);
    };

    render() {
        const restaurant = this.props.restaurant;
        const imagePath = 'images/' + restaurant.cuisine_icon;
        return (
            <div className="restaurant_cell" onClick={this.handleClick}>
                <div className="cuisine_icon_div">
                    <img className="cuisine_icon" src={imagePath} alt={restaurant.cuisine_icon} />
                </div>
                <div className="restaurant_main_info">
                    <div className="restaurant_name">
                        {restaurant.name}<br/><br/>
                    </div>
                    <div className="restaurant_address">
                        ~{restaurant.max_delivery_time} Minutes<br/>
                        {restaurant.address}<br/>
                    </div>
                </div>
                <div className="restaurant_secondary_info">
                    <div className="ten_bis_icon">
                        <img className={restaurant.accepts_ten_bis ? 'accepts_ten_bis' : 'not_accepts_ten_bis'} />
                    </div>
                    <div className="restaurant_rating">
                        {RestaurantCell.calcStars(restaurant.rating)}
                    </div>
                </div>
            </div>
        );
    }
}

export class EmptyRestaurantCell extends React.Component {
    render(){
        return (
        <div className="restaurant_cell">
            <div className="restaurant_name">
                No Restaurants Found
            </div>
        </div>
        );
    }
}

RestaurantCell.propTypes = {
    restaurant: PropTypes.object.isRequired,
};