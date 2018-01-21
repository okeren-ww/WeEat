module JsonHelper
  def compare_restaurants(json_body, expected_restaurant)
    puts json_body['rating']
    expect(json_body).to include(id: expected_restaurant.id,
                                 name: expected_restaurant.name,
                                 cuisine_id: expected_restaurant.cuisine_id,
                                 rating: expected_restaurant.rating.to_s,
                                 accepts_ten_bis: expected_restaurant.accepts_ten_bis,
                                 address: expected_restaurant.address,
                                 max_delivery_time: expected_restaurant.max_delivery_time)
  end
end
