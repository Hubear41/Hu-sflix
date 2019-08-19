class UpdateVideosDescription < ActiveRecord::Migration[5.2]
  def change
    change_column :videos, :description, :string, null: true
  end
end
