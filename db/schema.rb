# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150621223709) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "followings", force: :cascade do |t|
    t.integer  "follower_id", null: false
    t.integer  "followee_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "followings", ["follower_id", "followee_id"], name: "index_followings_on_follower_id_and_followee_id", unique: true, using: :btree
  add_index "followings", ["follower_id"], name: "index_followings_on_follower_id", using: :btree

  create_table "playlist_items", force: :cascade do |t|
    t.integer  "playlist_id", null: false
    t.integer  "song_id",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "ord",         null: false
  end

  add_index "playlist_items", ["id", "ord"], name: "index_playlist_items_on_id_and_ord", unique: true, using: :btree
  add_index "playlist_items", ["playlist_id"], name: "index_playlist_items_on_playlist_id", using: :btree
  add_index "playlist_items", ["song_id"], name: "index_playlist_items_on_song_id", using: :btree

  create_table "playlists", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.string   "title",       null: false
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "playlists", ["user_id"], name: "index_playlists_on_user_id", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "token",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["token"], name: "index_sessions_on_token", using: :btree

  create_table "songs", force: :cascade do |t|
    t.integer  "uploader_id",     null: false
    t.string   "artist",          null: false
    t.string   "title",           null: false
    t.string   "song_url",        null: false
    t.string   "small_image_url"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "large_image_url"
  end

  add_index "songs", ["artist"], name: "index_songs_on_artist", using: :btree
  add_index "songs", ["title"], name: "index_songs_on_title", using: :btree
  add_index "songs", ["uploader_id"], name: "index_songs_on_uploader_id", using: :btree

  create_table "tag_items", force: :cascade do |t|
    t.integer  "tag_id",     null: false
    t.integer  "song_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tag_items", ["tag_id", "song_id"], name: "index_tag_items_on_tag_id_and_song_id", unique: true, using: :btree

  create_table "tags", force: :cascade do |t|
    t.string   "text",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tags", ["text"], name: "index_tags_on_text", using: :btree

  create_table "trigrams", force: :cascade do |t|
    t.string  "trigram",     limit: 3
    t.integer "score",       limit: 2
    t.integer "owner_id"
    t.string  "owner_type"
    t.string  "fuzzy_field"
  end

  add_index "trigrams", ["owner_id", "owner_type", "fuzzy_field", "trigram", "score"], name: "index_for_match", using: :btree
  add_index "trigrams", ["owner_id", "owner_type"], name: "index_by_owner", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "email",           null: false
    t.text     "about_me"
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
