class CreateReviews < ActiveRecord::Migration[5.1]
  def change
    create_table :reviews do |t|
      t.string :reviewer_name
      t.integer :rating
      t.text :comment
      t.references :restaurant, foreign_key: true

      t.timestamps
    end
  end
end
