class ZomatoWorker
  include Sidekiq::Worker

  def perform(restaurant, cuisine_name)
    # Do something
    rest = Restaurant.create!(id: restaurant['restaurant']['id'],
                              name: restaurant['restaurant']['name'],
                              cuisine: cuisine_name,
                              accepts_ten_bis: true,
                              address: restaurant['restaurant']['location']['address'],
                              max_delivery_time: 10,
                              rating: 0)

    conn = Faraday.new(url: 'https://developers.zomato.com')
    conn.headers = { 'user-key' => ENV['ZOMATO_API_KEY'] }

    reviews = conn.get '/api/v2.1/reviews' do |request|
      request.params['res_id'] = rest.id
    end

    reviews_body = JSON.parse reviews.body
    reviews_body['user_reviews'].each do |review|
      Review.create!(id: review['review']['id'],
                     rating: review['review']['rating'],
                     reviewer_name: review['review']['user']['name'],
                     comment: review['review']['review_text'],
                     restaurant_id: rest.id)
    end

  end


end
