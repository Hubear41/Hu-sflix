class AddEpisodeNumToVideos < ActiveRecord::Migration[5.2]
  def change
    add_column :videos, :episode_num, :integer
  end
end
