class CreateMyList < ActiveRecord::Migration[5.2]
  def change
    create_table :my_list_videos do |t|
      t.integer :profile_id, null: false
      t.integer :video_id, null: false

      t.timestamps
    end

    add_index :my_list_videos, [:profile_id, :video_id]
  end
end
