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

class Preview < Video

end
