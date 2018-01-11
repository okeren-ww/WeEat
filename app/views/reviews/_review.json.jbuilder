json.extract! review, :id, :reviewer_name, :rating, :comment, :restaurant_id, :created_at, :updated_at
json.url review_url(review, format: :json)
