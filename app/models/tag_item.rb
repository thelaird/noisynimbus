class TagItem < ActiveRecord::Base
  validates :tag_id, uniqueness: { scope: :song_id }
  validates :song, :tag, presence: true

  belongs_to :song
  belongs_to :tag
end
