class CreateShows < ActiveRecord::Migration[5.2]
  def change
    create_table :shows do |t|
      t.string :poster_url, null: false, unique: true
      t.string :title, null: false
      t.string :director, null: false
      t.string :tagline, null: false
      t.integer :year
      t.string :maturity_rating

      t.timestamps
    end
  end
end
