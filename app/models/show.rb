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
#  show_type       :string           not null
#


class Show < ApplicationRecord
    MATURITY_RATINGS = %w(G PG PG-13 R NC-17)
    SHOW_TYPES = %w(FEATURE EPISODIC)
    
    validates :title, :director, :tagline, presence: true
    validates :maturity_rating, inclusion: { in: MATURITY_RATINGS }
    validates :show_type, presence: true, inclusion: { in: SHOW_TYPES }
    validates :view_count, presence: true

    attr_reader :movie_id, :episode_ids, :preview_id
    after_initialize :default_values
    
    has_one_attached :poster
    has_many :videos
    has_many :show_genres

    has_many :genres,
        through: :show_genres,
        source: :genre

    def next_show_id 
        all_ids = Show.where('id != :id', id: self.id).shuffle.first.id;
    end
 
    private

    def default_values 
        self.view_count ||= 0

        @episode_ids = []

        self.videos.each do |video|
            case video.video_type
            when 'PREVIEW'
                @preview_id = video.id
            when 'FILM'
                @movie_id = video.id
            when 'EPISODE'
                @episode_ids << video.id 
            end
        end
    end
end