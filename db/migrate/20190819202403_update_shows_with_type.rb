class UpdateShowsWithType < ActiveRecord::Migration[5.2]
  def change
    add_column :shows, :type, :string, null: false
  end
end
