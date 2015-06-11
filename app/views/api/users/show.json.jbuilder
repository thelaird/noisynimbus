json.(@user, :id, :username)

json.songs @user.songs do |song|
  json.(song, :title, :artist, :song_url, :image_url, :description)
end
