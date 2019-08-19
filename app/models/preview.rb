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
#  episode_num  :integer
#  type         :string           not null
#

class Preview < Video

end
