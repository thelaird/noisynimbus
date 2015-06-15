class PlaylistItem < ActiveRecord::Base
  validates :playlist, :song, presence: true

  belongs_to :song
  belongs_to :playlist

end
