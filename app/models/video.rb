# == Schema Information
#
# Table name: videos
#
#  id          :bigint           not null, primary key
#  show_id     :integer          not null
#  name        :string
#  description :string
#  runtime     :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  episode_num :integer
#  type        :string           not null
#


class Video < ApplicationRecord
    include Comparable
    
    # VIDEO_TYPES = %w(PREVIEW EPISODE FILM)
    
    validates :show_id, :runtime, presence: true
    # validates :video_type, inclusion: { in: VIDEO_TYPES }, presence: true

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
