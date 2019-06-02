# == Schema Information
#
# Table name: shows
#
#  id              :bigint           not null, primary key
#  poster_url      :string           not null
#  title           :string           not null
#  director        :string           not null
#  tagline         :string           not null
#  year            :integer
#  maturity_rating :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  view_count      :integer          not null
#


class Show < ApplicationRecord
    MATURITY_RATINGS = %w(G PG PG-13 R NC-17)
    
    validates :poster_url, :title, :director, :tagline, presence: true
    validates :maturity_rating, inclusion: { in: MATURITY_RATINGS }
    validates :view_count, presence: true
    
    has_many :videos
    has_one_attached :poster

    after_initialize :default_values

    def episode_ids 
       videos.map { |video| video.id if video.video_type == "EPISODE" }
    end

    def preview_id
        videos.each { |video| return video.id if video.video_type == "PREVIEW"}
    end

    def movie_id 
        videos.each { |video| return video.id if video.video_type == "MOVIE" }
    end

    private

    def default_values 
        self.view_count ||= 0
    end
end
