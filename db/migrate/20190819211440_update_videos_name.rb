class UpdateVideosName < ActiveRecord::Migration[5.2]
  def change
    change_column :videos, :name, :string, null: true
  end
end
