class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :video_url, null: false, unique: true
      t.integer :show_id, null: false
      t.string :name, null: false
      t.string :description, null: false
      t.string :type, null: false
      t.integer :runtime, null: false
      t.integer :credits_time

      t.timestamps
    end

    add_index :videos, :show_id
  end
end
