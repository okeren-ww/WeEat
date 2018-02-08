class ReviewsController < ApplicationController
  include ErrorConcern

  before_action :set_review, only: %i(show edit update destroy)

  # GET /reviews
  # GET /reviews.json
  def index
    reviews = Review.where(restaurant_id: params[:restaurant_id])

    render json: reviews.to_json
  end

  # GET /reviews/1
  # GET /reviews/1.json
  def show; end

  # GET /reviews/new
  def new
    @review = Review.new
  end

  # GET /reviews/1/edit
  def edit; end

  # POST /reviews
  # POST /reviews.json
  def create
    @review = Review.create!(review_params)

    render json: @review
  end

  # PATCH/PUT /reviews/1
  # PATCH/PUT /reviews/1.json
  def update
    @review.update!(review_params)

    render json: @review
  end

  # DELETE /reviews/1
  # DELETE /reviews/1.json
  def destroy
    @review.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_review
    @review = Review.find(params.require(:id))
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def review_params
    params.require(:review).permit(:reviewer_name, :rating, :comment, :restaurant_id)
  end
end
