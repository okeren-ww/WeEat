class RestaurantsController < ApplicationController
  include ErrorConcern

  def index
    restaurants = Restaurant.all

    render json: restaurants.to_json
  end

  def new
    @restaurant = Restaurant.new
  end

  def create
    @restaurant = Restaurant.create!(restaurant_params)

    render json: @restaurant
  end

  def destroy
    @restaurant.destroy!
  end

  def update
    @restaurant.update!(restaurant_params)

    render json: @restaurant
  end

  def show
    set_restaurant
    render json: @restaurant
  end

  def edit; end

  private

  def set_restaurant
    @restaurant = Restaurant.find(params.require(:id))
  end

  def restaurant_params
    params.require(:restaurant).permit(:name,
                                       :cuisine_id,
                                       :rating,
                                       :accepts_ten_bis,
                                       :address,
                                       :max_delivery_time)
  end
end
