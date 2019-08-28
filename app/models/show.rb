# == Schema Information
#
# Table name: shows
#
#  id              :bigint           not null, primary key
#  title           :string           not null
#  director        :string           not null
#  tagline         :string           not null
#  year            :integer
#  maturity_rating :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  view_count      :integer          not null
#  type            :string           not null
#  preview_id      :integer
#


class Show < ApplicationRecord
    MATURITY_RATINGS = %w(G PG PG-13 R NC-17 TV-14 TV-MA)
    
    validates :title, :director, :tagline, presence: true
    validates :maturity_rating, inclusion: { in: MATURITY_RATINGS }
    validates :view_count, presence: true

    after_initialize :default_values
    
    has_one_attached :poster

    has_many :videos
    
    belongs_to :preview,
        foreign_key: :preview_id,
        class_name: "Video",
        optional: true
    
    has_one :film,
        foreign_key: :show_id,
        class_name: "Film"

    has_many :episodes,
        foreign_key: :show_id,
        class_name: "Episode"

    has_many :show_genres

    has_many :genres,
        through: :show_genres,
        source: :genre

    has_many :my_list_shows,
        foreign_key: :show_id,
        class_name: "MyListShow"

    has_many :my_list_creator,
        through: :my_list_shows,
        source: :profile

    def default_values
        self.view_count = 0;
    end

    def film_id
        return nil if !self.film
        self.film.id
    end
end
