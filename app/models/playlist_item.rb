# == Schema Information
#
# Table name: playlist_items
#
#  id          :integer          not null, primary key
#  playlist_id :integer          not null
#  song_id     :integer          not null
#  created_at  :datetime
#  updated_at  :datetime
#  ord         :integer          not null
#

class PlaylistItem < ActiveRecord::Base
  validates :playlist, :song, presence: true

  belongs_to :song
  belongs_to :playlist

  before_save :init

  default_scope { order(:ord) }

  def update_ords(new_ord)

    if new_ord > self.ord
      
      items_to_update = self.playlist
        .playlist_items
        .where("playlist_id = ? AND ord BETWEEN ? AND ?", self.playlist_id, self.ord + 1, new_ord)

      items_to_update.each do |item|
        item.ord -= 1
        item.save
      end
    else
      items_to_update = self.playlist
        .playlist_items
        .where("playlist_id = ? AND ord BETWEEN ? AND ?", self.playlist_id, new_ord, self.ord - 1)

      items_to_update.each do |item|
        item.ord += 1
        item.save
      end
    end
    self.ord = new_ord
  end

  def init
    self.ord ||= 1
  end

end
