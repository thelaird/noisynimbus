json.(playlist, :title, :id)

json.songs playlist.songs do |song|
  json.partial! 'api/shared/song', song: song, logged_in: true
end
