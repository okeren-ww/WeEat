namespace :populate_db_from_csv do
  require 'csv'

  task populate_cuisines: :environment do

    CSV.foreach('lib/assets/cuisines.csv', headers: true) do |row|
      Cuisine.create!(row.to_hash)
    end
  end

  task populate_restaurants: :environment do
    CSV.foreach('lib/assets/restaurants.csv', headers: true) do |row|
      Restaurant.create!(row.to_hash)
    end
  end

  task populate_reviews: :environment do
    CSV.foreach('lib/assets/reviews.csv', headers: true) do |row|
      Review.create!(row.to_hash)
    end
  end

  task populate_db: :environment do
    populate_db_from_csv.tasks.each do |task|
      Rake::Task[task].invoke
    end
  end

end
