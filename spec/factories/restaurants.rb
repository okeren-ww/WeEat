FactoryBot.define do
  factory :restaurant do
    name 'McDonalds'
    address 'Ibn Gabirol 30'
    max_delivery_time 15
    accepts_ten_bis true
    cuisine 'American'


    factory :restaurant_with_reviews do

      transient do
        dummy_ratings []
      end

      after(:create) do |restaurant, evaluator|
        evaluator.dummy_ratings.each { |r| create(:review, restaurant: restaurant, rating: r) }
      end
    end

  end




end