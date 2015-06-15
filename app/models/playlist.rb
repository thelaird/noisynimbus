class Playlist < ActiveRecord::Base
  validates :title, :user_id, presence: true
  validates :title, length: { maximum: 30 }

  has_many :playlist_items
  belongs_to :user
end
