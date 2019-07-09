class RenameMyListVideosTable < ActiveRecord::Migration[5.2]
  def change
    rename_table :my_list_videos, :my_list_shows
  end
end
