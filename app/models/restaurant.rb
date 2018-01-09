class Restaurant < ApplicationRecord
  has_many :reviews
  validates :name, :cuisine, :rating, :accepts_ten_bis, :address, :max_delivery_time, presence: true
  validates :rating, numericality: [greater_than_or_equal_to: 0, less_than_or_equal_to: 3]
  validates :accepts_ten_bis, inclusion: [true, false]
  
 def rating
    reviews.empty? ? 0 : reviews.average(:rating)
  end
end
