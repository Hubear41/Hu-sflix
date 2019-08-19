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

class Movie < Show
    def _movie_id
        self.videos.each { |video| return video.id if video.video_type == "FILM"}
    end


    def get_video_ids
        [ self._movie_id ]
    end
end
