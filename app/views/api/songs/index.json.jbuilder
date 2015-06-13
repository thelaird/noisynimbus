json.array! @songs do |song|
  json.(song, :id, :artist, :title, :description, :song_url, :image_url)
end
