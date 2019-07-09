class UpdateMyList < ActiveRecord::Migration[5.2]
  def change
    remove_column :my_list_videos, :video_id
    add_column :my_list_videos, :show_id, :integer, null: false
    add_index :my_list_videos, [:profile_id, :show_id]
    add_index :show_genres, [:show_id, :genre_id]
  end
end
