class Playlist < ActiveRecord::Base
  validates :title, :user_id presence: true

  has_many: :playlist_items
  belongs_to: :user
end
