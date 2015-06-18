# == Schema Information
#
# Table name: playlists
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  title       :string           not null
#  description :text
#  created_at  :datetime
#  updated_at  :datetime
#

class Playlist < ActiveRecord::Base
  validates :title, :user_id, presence: true
  validates :title, length: { maximum: 30 }

  default_scope { order(:created_at) }

  has_many :playlist_items, dependent: :destroy
  has_many :songs, through: :playlist_items
  belongs_to :user
end
