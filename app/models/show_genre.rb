# == Schema Information
#
# Table name: show_genres
#
#  id         :bigint           not null, primary key
#  show_id    :integer          not null
#  genre_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ShowGenre < ApplicationRecord 
    validates :show_id, uniqueness: { scope: [:show_id, :genre_id] }

    belongs_to :show
    belongs_to :genre
end
