class ReviewSerializer < ActiveModel::Serializer
  attributes :id,
             :reviewer_name,
             :rating,
             :comment
end
