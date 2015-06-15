json.(playlist, :title)

json.songs playlist.songs do |song|
  json.(song, :title, :artist, :song_url, :image_url, :description, :created_at)
  json.uploader do
    json.username song.uploader.username
    json.id song.uploader_id
  end
end
