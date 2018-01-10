namespace :zomato_api do
  desc 'Loads restaurants from NYC using Zomato API'
  task load_restaurant_to_db: :environment do
    conn = Faraday.new(url: 'https://developers.zomato.com')
    conn.headers = { 'user-key' => ENV['ZOMATO_API_KEY'] }

    # Retrieving cuisines
    cuisines = conn.get '/api/v2.1/cuisines' do |request|
      request.params['city_id'] = 280
    end

    cuisines_body = JSON.parse cuisines.body
    cuisines_body['cuisines'].each do |cuisine|
      cuisine_id = cuisine['cuisine']['cuisine_id']

      puts 'cuisine name: ' + cuisine['cuisine']['cuisine_name']
      puts '=================='

      restaurants = conn.get '/api/v2.1/search' do |request|
        request.params['city_id'] = 280
        request.params['cuisines'] = cuisine_id
        request.params['count'] = 1
      end

      restaurant_body = JSON.parse restaurants.body
      restaurant_body['restaurants'].each do |restaurant|
        create_restaurant restaurant
        fetch_reviews restaurant['restaurant']['id'], conn
      end
    end
  end

  def create_restaurant(restaurant)
    Restaurant.create!(id: restaurant['restaurant']['id'],
                       name: restaurant['restaurant']['name'],
                       cuisine: cuisine_name,
                       accepts_ten_bis: true,
                       address: restaurant['restaurant']['location']['address'],
                       max_delivery_time: 10,
                       rating: 0)
  end

  def fetch_reviews(restaurant_id, conn)
    reviews = conn.get '/api/v2.1/reviews' do |request|
      request.params['res_id'] = rest.id
    end

    reviews_body = JSON.parse reviews.body
    reviews_body['user_reviews'].each do |review|
      Review.create!(id: review['review']['id'],
                     rating: review['review']['rating'],
                     reviewer_name: review['review']['user']['name'],
                     comment: review['review']['review_text'],
                     restaurant_id: restaurant_id)
    end
  end
end
