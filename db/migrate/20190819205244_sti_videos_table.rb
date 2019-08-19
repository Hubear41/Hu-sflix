class StiVideosTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :videos, :video_type
    add_column :videos, :type, :string, null: false
  end
end
