namespace :zomato_api do
  desc 'Loads restaurants from NYC using Zomato API'
  task load_restaurant_to_db: :environment do
    conn = Faraday.new(url: 'https://developers.zomato.com')
    conn.headers = { 'user-key' => '1aea80c4eaa47d73499522cbe8d7714b' }
    # conn.use Faraday::Response::Logger #used for logging purposes


    # Retrieving cuisines
    cuisines = conn.get '/api/v2.1/cuisines' do |request|
      request.params['city_id'] = 280
    end

    cuisines_body = JSON.parse cuisines.body
    cuisines_body["cuisines"].each do |cuisine|
      cuisine_id = cuisine["cuisine"]["cuisine_id"]
      cuisine_name = cuisine["cuisine"]["cuisine_name"]

      puts 'cuisine name: ' + cuisine["cuisine"]["cuisine_name"]
      puts "=================="

      restaurants = conn.get '/api/v2.1/search' do |request|
        request.params['city_id'] = 280
        request.params['cuisines'] = cuisine_id
        request.params['count'] = 1
      end

      restaurant_body = JSON.parse restaurants.body
      restaurant_body['restaurants'].each do |restaurant|
        puts restaurant['restaurant']['name']
        Restaurant.create!(name: restaurant['restaurant']['name'],
                           cuisine: cuisine_name,
                           accepts_ten_bis: true,
                           address: restaurant['restaurant']['location']['address'],
                           max_delivery_time: 10,
                           rating: 0)


      end

    end


  end

end
