# == Schema Information
#
# Table name: my_list_videos
#
#  id         :bigint           not null, primary key
#  profile_id :integer          not null
#  video_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class MyListVideo < ApplicationRecord 
    validates :profile_id, :video_id, presence: true

    belongs_to :video
    belongs_to :profile,
        foreign_key: :profile_id,
        class_name: 'User'
end
