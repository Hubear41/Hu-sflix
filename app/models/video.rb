# == Schema Information
#
# Table name: videos
#
#  id           :bigint           not null, primary key
#  video_url    :string           not null
#  show_id      :integer          not null
#  name         :string           not null
#  description  :string           not null
#  runtime      :integer          not null
#  credits_time :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  video_type   :string           not null
#


class Video < ApplicationRecord
    VIDEO_TYPES = %w(PREVIEW EPISODE MOVIE)
    
    validates :video_url, uniqueness: true, presence: true
    validates :show_id, :name, :description, :runtime, presence: true
    validates :video_type, inclusion: { in: VIDEO_TYPES }, presence: true

    belongs_to :show
end
