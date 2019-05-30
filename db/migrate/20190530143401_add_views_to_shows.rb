class AddViewsToShows < ActiveRecord::Migration[5.2]
  def change
    add_column :shows, :view_count, :integer, null: false
  end
end
