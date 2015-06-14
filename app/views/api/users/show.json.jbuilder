json.(@user, :id, :username)

json.songs @user.songs do |song|
  json.(song, :title, :artist, :song_url, :image_url, :description, :created_at)
  json.uploader do
    json.username song.uploader.username
    json.id song.uploader_id
    if current_user.followed_users.include?(User.find(song.uploader_id))
      json.followed "true"
    else
      json.followed "false"
    end
  end
end
