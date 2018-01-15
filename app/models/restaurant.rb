class Restaurant < ApplicationRecord
  has_many :reviews
  validates :name, :cuisine_id, :rating, :accepts_ten_bis, :address, :max_delivery_time, presence: true
  validates :rating, numericality: [greater_than_or_equal_to: 0, less_than_or_equal_to: 5]
  validates :accepts_ten_bis, inclusion: [true, false]
  validates :max_delivery_time, numericality: [greater_than_or_equal_to: 0, less_than_or_equal_to: 180]

  after_initialize :init

  def init
    self.rating ||= 0
  end

  def rating
    reviews.empty? ? 0 : reviews.average(:rating)
  end
end
