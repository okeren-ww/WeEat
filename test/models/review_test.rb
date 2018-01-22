# == Schema Information
#
# Table name: reviews
#
#  id            :integer          not null, primary key
#  reviewer_name :string
#  rating        :integer
#  comment       :text
#  restaurant_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

require 'test_helper'

class ReviewTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
