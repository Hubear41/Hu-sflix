class AddPreviewIdToShows < ActiveRecord::Migration[5.2]
  def change
    add_column :shows, :preview_id, :integer
  end
end
