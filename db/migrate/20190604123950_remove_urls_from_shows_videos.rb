class RemoveUrlsFromShowsVideos < ActiveRecord::Migration[5.2]
  def change
    remove_column :shows, :poster_url
    remove_column :videos, :video_url
  end
end
