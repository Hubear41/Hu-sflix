# == Schema Information
#
# Table name: my_list_shows
#
#  id         :bigint           not null, primary key
#  profile_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  show_id    :integer          not null
#

class MyListShow < ApplicationRecord 
    belongs_to :show
    belongs_to :profile,
        foreign_key: :profile_id,
        class_name: 'User'
end
