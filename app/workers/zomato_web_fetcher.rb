class ZomatoWebFetcher
  include Sidekiq::Worker

  CITY_ID = 280
  NUM_OF_RESTAURANTS = 1

  def perform
    cuisines = fetch_cuisines_list
    cuisines.each do |cuisine|
      cuisine_id = cuisine['cuisine']['cuisine_id']
      restaurants = fetch_restaurant(cuisine_id)
      restaurants.each do |restaurant|
        fetch_review restaurant['restaurant']['id']
      end
    end
  end

  def initialize
    @conn = Faraday.new(url: ENV['ZOMATO_ROOT_URL']) do |c|
      c.headers['user-key'] = ENV['ZOMATO_API_KEY']
      c.request :json
      c.adapter Faraday.default_adapter
    end
  end

  def fetch_cuisines_list(city_id = CITY_ID)
    cuisines = @conn.get ENV['ZOMATO_API_URL'] + '/cuisines' do |request|
      request.params['city_id'] = city_id
    end

    cuisines_body = JSON.parse(cuisines.body)
    cuisines_body['cuisines'].each do |cuisine|
      cuisine_info = cuisine['cuisine']
      create_cuisine cuisine_info
    end
  end

  def fetch_restaurant(cuisine, city_id = CITY_ID)
    restaurants = @conn.get ENV['ZOMATO_API_URL'] + '/search' do |request|
      request.params['city_id'] = city_id
      request.params['cuisines'] = cuisine
      request.params['count'] = NUM_OF_RESTAURANTS
    end

    restaurant_body = JSON.parse restaurants.body
    restaurant_body['restaurants'].each do |restaurant|
      create_restaurant restaurant, cuisine
    end
  end

  def fetch_review(restaurant_id)
    reviews = @conn.get ENV['ZOMATO_API_URL'] + '/reviews' do |request|
      request.params['res_id'] = restaurant_id
    end

    reviews_body = JSON.parse reviews.body
    reviews_body['user_reviews'].each do |review|
      create_review review, restaurant_id
    end
  end

  private

  def create_cuisine(cuisine)
    cuisine_id = cuisine['cuisine_id']
    cuisine_name = cuisine['cuisine_name']
    cuisine_img = cuisine_name + '.jpg'
    Cuisine.create!(id: cuisine_id,
                    name: cuisine_name,
                    icon: cuisine_img)
  end

  def create_restaurant(restaurant, cuisine_id)
    Restaurant.create!(id: restaurant['restaurant']['id'],
                       name: restaurant['restaurant']['name'],
                       cuisine_id: cuisine_id,
                       accepts_ten_bis: true,
                       address: restaurant['restaurant']['location']['address'],
                       max_delivery_time: 10)
  end

  def create_review(review, restaurant_id)
    Review.create!(id: review['review']['id'],
                   rating: review['review']['rating'],
                   reviewer_name: review['review']['user']['name'],
                   comment: review['review']['review_text'],
                   restaurant_id: restaurant_id)
  end
end