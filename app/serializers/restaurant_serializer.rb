class RestaurantSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :cuisine,
             :rating,
             :accepts_ten_bis,
             :address,
             :max_delivery_time

  has_many :reviews

  def rating
    object.rating
  end
end
