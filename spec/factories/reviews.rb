# == Schema Information
#
# Table name: reviews
#
#  id            :integer          not null, primary key
#  reviewer_name :string
#  rating        :integer
#  comment       :text
#  restaurant_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

FactoryBot.define do
  factory :review do
    reviewer_name { Faker::SiliconValley.character }
    rating { Faker::Number.between(0, 5) }
    comment { Faker::ChuckNorris.fact }

    association :restaurant, factory: :restaurant
  end
end
