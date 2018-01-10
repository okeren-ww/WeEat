class ZomatoWorker
  include Sidekiq::Worker

  def perform(restaurant, cuisine_name)
    # TODO: Move into here?
  end
end
