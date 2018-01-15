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
