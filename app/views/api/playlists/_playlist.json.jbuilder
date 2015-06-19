json.(playlist, :title, :id)

json.songs playlist.songs.includes(:playlist_items) do |song|
  json.partial! 'api/shared/song', song: song, playlist: playlist, logged_in: true
end
