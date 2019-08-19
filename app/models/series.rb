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
#

class Series < Show
    def _episode_ids
        self.videos.map  { |video| video.id if video.video_type == "EPISODE" }
    end 

    def get_video_ids
        self._episode_ids
    end
end
