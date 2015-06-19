json.(tag, :id, :text)

json.songs tag.songs do |song|
  json.partial! 'api/shared/song', song: song, logged_in: true, playlist: false
end
