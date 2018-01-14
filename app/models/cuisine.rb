class Cuisine < ApplicationRecord

  validates :name, :icon, presence: true
  validates :name, uniqueness: true

end
