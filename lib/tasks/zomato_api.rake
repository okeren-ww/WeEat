namespace :zomato_api do
  desc 'Loads restaurants from NYC using Zomato API'

  task load_restaurant_to_db: :environment do
    require 'sidekiq/api'

    # Clear Sidekiq queue
    Sidekiq::RetrySet.new.clear
    Sidekiq::ScheduledSet.new.clear
    Sidekiq::Stats.new.reset
    Sidekiq.redis(&:flushall)

    ZomatoWorker.perform_async
  end
end
