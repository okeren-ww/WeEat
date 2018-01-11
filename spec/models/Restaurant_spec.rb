require 'rails_helper'
require 'faker'

describe Restaurant do
  # Model member verification
  it { should validate_presence_of :name }
  it { should validate_presence_of :cuisine }
  it { should validate_presence_of :accepts_ten_bis }
  it { should validate_presence_of :address }
  it { should validate_presence_of :max_delivery_time }
  it { should have_many(:reviews) }


  context 'Restaurant with no parameters' do
    it 'Should Raise 7 errors' do
      restaurant = Restaurant.create
      expect(restaurant.errors.size).to eq(7)

    end
  end

  context 'Restaurant with no reviews' do
    let!(:restaurant_no_reviews) { FactoryBot.create(:restaurant) }
    it 'Should be created successfully and rating is 0' do
      expect(restaurant_no_reviews.rating).to eql(0)
    end
  end

  context 'Restaurant with reviews' do
    ratings = []
    (0..4).each do |i|
      ratings.push Faker::Number.between(0, 5)
    end
    # move faker to factory
    let!(:restaurant_with_reviews) { FactoryBot.create(:restaurant_with_reviews, dummy_ratings: ratings) }
    it 'Should return average rating' do
      expect(restaurant_with_reviews.rating).to eql(ratings.sum.fdiv(ratings.size))
    end
  end

end