# == Schema Information
#
# Table name: cuisines
#
#  id         :integer          not null, primary key
#  name       :string
#  icon       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryBot.define do
  factory :cuisine do
    id { Faker::Number.between(1, 100) }
    name { Faker::Hipster.word }
    icon { Faker::Witcher.monster }
  end
end
