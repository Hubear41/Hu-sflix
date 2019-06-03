class RemoveCreditsRestraintFromVideos < ActiveRecord::Migration[5.2]
  def change
    change_column :videos, :credits_time, :integer, null: true
  end
end
