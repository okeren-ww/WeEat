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

describe Restaurant do
  # Model member verification
  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_presence_of :cuisine_id }
  it { is_expected.to validate_presence_of :accepts_ten_bis }
  it { is_expected.to validate_presence_of :address }
  it { is_expected.to validate_presence_of :max_delivery_time }
  it { should have_many(:reviews) }

  context 'Restaurant with no parameters' do
    it 'Should Raise an RecordInvalid error' do
      expect { Restaurant.create! }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end

  context 'Restaurant with no reviews' do
    let!(:restaurant_no_reviews) { FactoryBot.create(:restaurant) }

    it 'Should be created successfully and rating is 0' do
      expect(restaurant_no_reviews.rating).to eql(0)
    end
  end

  context 'Restaurant with reviews' do
    # move faker to factory
    ratings = RestaurantFactory.create_dummy_ratings
    let!(:restaurant_with_reviews) { FactoryBot.create(:restaurant_with_reviews, dummy_ratings: ratings) }

    it 'Should return average rating' do
      puts restaurant_with_reviews.rating
      puts ratings.sum.fdiv(ratings.size)
      expect(restaurant_with_reviews.rating).to eql(ratings.sum.fdiv(ratings.size))
    end
  end
end
