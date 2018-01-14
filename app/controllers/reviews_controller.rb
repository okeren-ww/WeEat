class ReviewsController < ApplicationController
  include ErrorConcern

  before_action :set_review, only: %i(show edit update destroy)

  # GET /reviews
  # GET /reviews.json
  def index
    @reviews = Review.all
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
    @review = Review.new(review_params)
    @review.save!
    render :show, status: :created, review: @review
  end

  # PATCH/PUT /reviews/1
  # PATCH/PUT /reviews/1.json
  def update
    @review.update!(review_params)
    render :show, status: :ok, review: @review
  end

  # DELETE /reviews/1
  # DELETE /reviews/1.json
  def destroy
    @review.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_review
    @review = Review.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def review_params
    params.require(:review).permit(:reviewer_name, :rating, :comment, :restaurant_id)
  end
end
