namespace :zomato_api do
  desc 'Loads restaurants from NYC using Zomato API'

  task load_restaurant_to_db: :environment do
    require 'sidekiq/api'

    # Clear Sidekiq queue
    Sidekiq::RetrySet.new.clear
    Sidekiq::ScheduledSet.new.clear
    Sidekiq.redis(&:flushall)

    ZomatoWebFetcher.perform_async
  end
end
