json.(song, :id, :artist, :title, :song_url, :small_image_url, :large_image_url, :description, :created_at)

json.uploader do
  json.username song.uploader.username
  json.id song.uploader_id

  if logged_in
    json.following do
      following = current_user.followings.find_by(followee_id: song.uploader_id)
      json.(following, :id) if following
    end
  end
end

json.tags song.tags do |tag|
  json.(tag, :id, :text)
end
