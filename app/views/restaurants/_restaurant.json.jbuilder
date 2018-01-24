json.extract! restaurant, :id, :name, :cuisine_id, :cuisine_icon, :rating, :accepts_ten_bis, :address, :max_delivery_time
json.url restaurant_url(restaurant, format: :json)