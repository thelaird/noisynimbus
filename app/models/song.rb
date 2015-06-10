# == Schema Information
#
# Table name: songs
#
#  id            :integer          not null, primary key
#  uploader_id   :integer          not null
#  artist        :string           not null
#  title         :string           not null
#  song_url      :string           not null
#  album_art_url :string
#  description   :text
#  created_at    :datetime
#  updated_at    :datetime
#

class Song < ActiveRecord::Base
  validates :uploader_id, :artist, :title, :song_url, presence: true
  belongs_to(
    :uploader,
    class_name: 'User',
    foreign_key: :uploader_id
  )
end