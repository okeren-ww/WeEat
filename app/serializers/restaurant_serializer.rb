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

class RestaurantSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :cuisine_id,
             :rating,
             :accepts_ten_bis,
             :address,
             :max_delivery_time

  def rating
    object.rating
  end
end
