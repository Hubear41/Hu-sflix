class AddTypeToShows < ActiveRecord::Migration[5.2]
  def change
    add_column :shows, :show_type, :string, null: false
  end
end
