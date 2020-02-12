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
        
    validates :show_id, :runtime, presence: true

    belongs_to :show
    has_one :previewing_show,
        foreign_key: :preview_id,
        class_name: "Show"

    has_one_attached :cover_imaeg
    has_one_attached :video_file

    def <=>(other_episode)
        return 1 if other_episode.episode_num.nil?
        return 0 if other_episode.episode_num.nil? && self.episode_num.nil?
        return -1 if self.episode_num.nil?

        self.episode_num <=> other_episode.episode_num
    end
end
