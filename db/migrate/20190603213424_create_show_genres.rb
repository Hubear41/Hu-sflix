class CreateShowGenres < ActiveRecord::Migration[5.2]
  def change
    create_table :show_genres do |t|
      t.integer :show_id, null: false
      t.integer :genre_id, null: false
      t.timestamps
    end
  end
end
