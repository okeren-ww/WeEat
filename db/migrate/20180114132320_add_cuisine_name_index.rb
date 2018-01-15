class AddCuisineNameIndex < ActiveRecord::Migration[5.1]
  def change
    add_index :cuisines, :name, unique: true
  end
end
