# Schema Information

## songs
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
artist      | string    | not null
title       | string    | not null
album       | string    |
song_url    | string    | not null
art_url     | string    |
description | text      |

## followings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
followee_id | integer   | not null, foreign key (references users)
follower_id | integer   | not null, foreign key (references users)

## playlists
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
owner_id    | integer   | not null, foreign key (references users)
title       | string    | not null
description | text      |

## playlist_items
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
playlist_id | integer   | not null, foreign key (references playlist)
song_id     | integer   | not null, foreign key (references songs)

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
label       | string    | not null, unique

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
song_id     | integer   | not null, foreign key (references songs)
tag_id      | integer   | not null, foreign key (references tags)

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
