# == Schema Information
#
# Table name: tag_items
#
#  id         :integer          not null, primary key
#  tag_id     :integer          not null
#  song_id    :integer          not null
#  created_at :datetime
#  updated_at :datetime
#

class TagItem < ActiveRecord::Base
  validates :tag_id, uniqueness: { scope: :song_id }
  validates :song, :tag, presence: true

  belongs_to :song
  belongs_to :tag
end
