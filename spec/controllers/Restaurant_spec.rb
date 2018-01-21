require 'rails_helper'

describe RestaurantsController, type: :controller do
  ratings = []
  (0..4).each do |i|
    ratings.push Faker::Number.between(0, 5)
  end

  let!(:restaurant_with_reviews) { FactoryBot.create(:restaurant_with_reviews, dummy_ratings: ratings) }
  let!(:restaurant_no_reviews) { FactoryBot.create(:restaurant) }

  describe 'Get index' do
    before do
      get :index
    end

    it 'Returns 200 OK' do
      expect(response).to have_http_status(200)
    end

    it 'Returns a JSON body with the expected Restaurant' do
      expect(response.content_type).to eq("application/json")
      parsed_body = JSON.parse(response.body)
      expect(parsed_body.size).to be(2)
      compare_restaurants parsed_body.first.symbolize_keys, restaurant_with_reviews
      compare_restaurants parsed_body.second.symbolize_keys, restaurant_no_reviews

    end

  end

  describe 'Get show' do
    before do
      get :show, params: { id: restaurant_with_reviews.id }
    end
    it 'Returns 200 OK' do
      expect(response).to have_http_status(200)
    end

    it 'Returns a JSON Body with one element and is expected Restaurant' do
      expect(response.content_type).to eq("application/json")
      parsed_body = JSON.parse(response.body)
      compare_restaurants(parsed_body.symbolize_keys, restaurant_with_reviews)

    end
  end

end
