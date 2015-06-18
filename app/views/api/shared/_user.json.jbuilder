json.(user, :id, :username)

json.songs user.songs do |song|
  json.partial! 'api/shared/song', song: song, logged_in: true
end
