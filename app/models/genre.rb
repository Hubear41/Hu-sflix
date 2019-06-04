# == Schema Information
#
# Table name: genres
#
#  id         :bigint           not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Genre < ApplicationRecord 
    validates :name, presence: true, uniqueness: true

    has_many :show_genres
    has_many :shows_with_genre,
        through: :show_genres,
        source: :show

    has_many :associated_genres,
        through: :shows_with_genre,
        source: :genres 

    def related_genre_ids 
        associated_genres.map { |genre| genre.id unless genre.name === self.name }
    end
end
