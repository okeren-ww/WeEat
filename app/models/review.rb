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

class Review < ApplicationRecord
  belongs_to :restaurant
  validates :reviewer_name, :rating, :comment, presence: true
  validates :rating, numericality: [greater_than_or_equal_to: 0, less_than_or_equal_to: 5]
end