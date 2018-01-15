class CuisinesController < ApplicationController
  include ErrorConcern

  def index
    cuisines = Cuisine.all

    render json: cuisines.to_json
  end

  def new
    @cuisine = Cuisine.new
  end

  def create
    @cuisine = Cuisine.create!(cuisine_params)

    render json: @cuisine
  end

  def destroy
    @cuisine.destroy!
  end

  def update
    @cuisine.update!(cuisine_params)

    render json: @cuisine
  end

  private

  def set_cuisine
    @cuisine = Cuisine.find(params.require(:id))
  end

  def cuisine_params
    params.require(:cuisine).permit(:name, :icon)
  end
end
