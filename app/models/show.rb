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
    
    validates :poster_url, :title, :director, :tagline, presence: true
    validates :maturity_rating, inclusion: { in: MATURITY_RATINGS }
    validates :show_type, presence: true, inclusion: { in: SHOW_TYPES }
    validates :view_count, presence: true
    
    has_one_attached :poster
    has_many :videos
    has_many :show_genres

    has_many :genres,
        through: :show_genres,
        source: :genre

    after_initialize :default_values

    def episode_ids 
        return nil if self.show_type == "FEATURE"

        videos.where.not(video_type: 'PREVIEW').order(:episode_num).map { |video| video.id }
    end

    def preview_id
        preview = videos.where(video_type: 'PREVIEW').first

        preview.nil? ? nil : preview.id
    end

    def movie_id 
        return nil if self.show_type == 'EPISODIC'

        videos.where.not(video_type: 'PREVIEW').first.id
    end

    private

    def default_values 
        self.view_count ||= 0
    end

end
