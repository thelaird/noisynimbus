json.songs_by_artist do
  json.array! @songs_by_artist, partial: 'api/shared/song', as: :song
end
json.songs_by_title do
  json.array! @songs_by_title, partial: 'api/shared/song', as: :song
end
json.tags do
  json.array! @tags, partial: 'api/shared/tag', as: :tag
end
json.users do
  json.array! @users, partial: 'api/shared/user', as: :user
end
