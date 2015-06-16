# == Schema Information
#
# Table name: playlist_items
#
#  id          :integer          not null, primary key
#  playlist_id :integer          not null
#  song_id     :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#

class PlaylistItem < ActiveRecord::Base
  validates :playlist, :song, presence: true

  belongs_to :song
  belongs_to :playlist

end
