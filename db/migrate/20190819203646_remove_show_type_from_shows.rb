class RemoveShowTypeFromShows < ActiveRecord::Migration[5.2]
  def change
    remove_column :shows, :show_type
  end
end
