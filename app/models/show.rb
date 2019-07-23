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
    MATURITY_RATINGS = %w(G PG PG-13 R NC-17 TV-14 TV-MA)
    SHOW_TYPES = %w(FEATURE EPISODIC)
    
    validates :title, :director, :tagline, presence: true
    validates :maturity_rating, inclusion: { in: MATURITY_RATINGS }
    validates :show_type, presence: true, inclusion: { in: SHOW_TYPES }
    validates :view_count, presence: true

    attr_reader :movie_id, :episode_ids, :preview_id
    # after_initialize :default_values
    
    has_one_attached :poster
    has_many :videos
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
 
    # def default_values 
    #     self.view_count ||= 0
    #     @episode_ids = []

    #     self.videos.each do |video|
    #         case video.video_type
    #         when 'PREVIEW'
    #             @preview_id = video.id
    #         when 'FILM'
    #             @movie_id = video.id
    #         when 'EPISODE'
    #             @episode_ids << video.id 
    #         end
    #     end
    # end

    def preview_id 
        self.videos.each { |video| return video.id if video.video_type == "PREVIEW"}
    end

    def movie_id
        self.videos.each { |video| return video.id if video.video_type == "FILM"}
    end

    def episode_ids
        self.videos.map  { |video| video.id if video.video_type == "EPISODE" }
    end 
end