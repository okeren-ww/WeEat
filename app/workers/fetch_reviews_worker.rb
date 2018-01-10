class FetchReviewsWorker
  include Sidekiq::Worker

  def perform(restaurant_id)
    conn = Faraday.new(url: 'https://developers.zomato.com')
    conn.headers = { 'user-key' => ENV['ZOMATO_API_KEY'] }

    reviews = conn.get '/api/v2.1/reviews' do |request|
      request.params['res_id'] = restaurant_id
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
