require 'rails_helper'

describe RestaurantsController, type: :controller do
  ratings = RestaurantFactory.create_dummy_ratings

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
      expect(response.content_type).to eq('application/json')
      parsed_body = JSON.parse(response.body)
      expect(parsed_body.size).to be(2)
      compare_restaurants parsed_body.first.symbolize_keys, restaurant_with_reviews
      compare_restaurants parsed_body.second.symbolize_keys, restaurant_no_reviews
    end
  end

  describe 'GET Restaurant with reviews' do
    before do
      get :show, params: { id: restaurant_with_reviews.id }
    end
    it 'Returns 200 OK' do
      expect(response).to have_http_status(:ok)
    end

    it 'Returns a JSON Body with one element and is expected Restaurant' do
      expect(response.content_type).to eq('application/json')
      parsed_body = JSON.parse(response.body)
      compare_restaurants(parsed_body.symbolize_keys, restaurant_with_reviews)
    end
  end

  describe 'GET Restaurant with no reviews' do
    before do
      get :show, params: { id: restaurant_no_reviews.id }
    end
    it 'Returns 200 OK' do
      expect(response).to have_http_status(:ok)
    end

    it 'Returns a JSON Body with one element and is expected Restaurant' do
      expect(response.content_type).to eq('application/json')
      parsed_body = JSON.parse(response.body)
      compare_restaurants(parsed_body.symbolize_keys, restaurant_no_reviews)
    end
  end

  def compare_restaurants(json_body, expected_restaurant)
    expect(json_body).to include(id: expected_restaurant.id,
                                 name: expected_restaurant.name,
                                 cuisine_id: expected_restaurant.cuisine_id,
                                 rating: expected_restaurant.rating.to_s,
                                 accepts_ten_bis: expected_restaurant.accepts_ten_bis,
                                 address: expected_restaurant.address,
                                 max_delivery_time: expected_restaurant.max_delivery_time)
  end
end
