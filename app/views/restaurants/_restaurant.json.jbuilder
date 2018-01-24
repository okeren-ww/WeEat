json.extract! restaurant, :name, :cuisine_id, :rating, :accepts_ten_bis, :address, :max_delivery_time
json.url restaurant_url(restaurant, format: :json)