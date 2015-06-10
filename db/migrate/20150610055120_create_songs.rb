class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.integer :uploader_id, null: false
      t.string :artist, null: false
      t.string :title, null: false
      t.string :song_url, null: false
      t.string :album_art_url
      t.text :description

      t.timestamps
    end

    add_index :songs, :uploader_id
  end
end
