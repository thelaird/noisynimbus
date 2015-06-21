json.(user, :id, :username, :email, :about_me)

json.songs user.songs.order('created_at desc') do |song|
  json.partial! 'api/shared/song', song: song, logged_in: true, playlist: false
end
