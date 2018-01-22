class ZomatoWorker
  include Sidekiq::Worker

  def perform
    web_fetcher = ZomatoWebFetcher.new
    cuisines = web_fetcher.fetch_cuisines_list
    cuisines.each do |cuisine|
      cuisine_id = cuisine['cuisine']['cuisine_id']
      restaurants = web_fetcher.fetch_restaurant(cuisine_id)
      restaurants.each do |restaurant|
        web_fetcher.fetch_review restaurant['restaurant']['id']
      end
    end
  end
end
