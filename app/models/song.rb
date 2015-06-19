# == Schema Information
#
# Table name: songs
#
#  id              :integer          not null, primary key
#  uploader_id     :integer          not null
#  artist          :string           not null
#  title           :string           not null
#  song_url        :string           not null
#  small_image_url :string
#  description     :text
#  created_at      :datetime
#  updated_at      :datetime
#  large_image_url :string
#

class Song < ActiveRecord::Base
  validates :uploader_id, :artist, :title, :song_url, presence: true
  validates :artist, :title, length: { maximum: 25 }
  belongs_to(
    :uploader,
    class_name: 'User',
    foreign_key: :uploader_id
  )

  fuzzily_searchable :artist, :title

  has_many :tag_items, dependent: :destroy
  has_many :playlist_items, dependent: :destroy
  has_many :tags, through: :tag_items, source: :tag
end
