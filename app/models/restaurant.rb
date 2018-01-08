class Restaurant < ApplicationRecord
  validates :name, :cuisine, :rating, :accepts_ten_bis, :address, :max_delivery_time, presence: true
  validates :rating, numericality: [greater_than_or_equal_to: 0, less_than_or_equal_to: 3]

end
