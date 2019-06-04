# == Schema Information
#
# Table name: videos
#
#  id           :bigint           not null, primary key
#  show_id      :integer          not null
#  name         :string           not null
#  description  :string           not null
#  runtime      :integer          not null
#  credits_time :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  video_type   :string           not null
#  episode_num  :integer
#


class Video < ApplicationRecord
    include Comparable
    
    VIDEO_TYPES = %w(PREVIEW EPISODE FILM)
    
    validates :show_id, :name, :description, :runtime, presence: true
    validates :video_type, inclusion: { in: VIDEO_TYPES }, presence: true

    belongs_to :show
    has_one_attached :cover_image
    has_one_attached :video_file

    def <=>(other_video)
        return 0 if other_video.episode_num.nil? && self.episode_num.nil?
        return -1 if self.episode_num.nil?
        return 1 if other_video.episode_num.nil?

        self.episode_num <=> other_video.episode_num
    end
end
