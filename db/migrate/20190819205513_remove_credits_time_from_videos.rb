class RemoveCreditsTimeFromVideos < ActiveRecord::Migration[5.2]
  def change
    remove_column :videos, :credits_time
  end
end
