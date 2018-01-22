# == Schema Information
#
# Table name: restaurants
#
#  id                :integer          not null, primary key
#  name              :string
#  rating            :integer          default(0)
#  accepts_ten_bis   :boolean
#  address           :string
#  max_delivery_time :integer
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  cuisine_id        :integer
#

class RestaurantFactory
  FactoryBot.define do
    factory :restaurant do
      name { Faker::Space.nebula }
      address { Faker::Address.street_address }
      max_delivery_time { Faker::Number.between(1, 60) }
      accepts_ten_bis true

      association :cuisine, factory: :cuisine
 
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

  def self.create_dummy_ratings
    ratings = []
    (0..4).each do |_i|
      ratings.push Faker::Number.between(0, 5)
    end
  end
end
