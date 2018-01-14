class ChangeCuisineToRef < ActiveRecord::Migration[5.1]
  def change
    remove_column :restaurants, :cuisine, :string
    add_reference :restaurants, :cuisine, index: true

  end
end
