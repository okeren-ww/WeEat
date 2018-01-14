FactoryBot.define do
  factory :review do
    reviewer_name { Faker::SiliconValley.character }
    rating { Faker::Number.between(0, 5) } # braces
    comment { Faker::ChuckNorris.fact }

    association :restaurant, factory: :restaurant

  end

end