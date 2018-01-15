class Review < ApplicationRecord
  belongs_to :restaurant
  validates :reviewer_name, :rating, :comment, presence: true
  validates :rating, numericality: [greater_than_or_equal_to: 0, less_than_or_equal_to: 3]
end
