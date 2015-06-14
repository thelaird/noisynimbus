class CreatePlaylistItems < ActiveRecord::Migration
  def change
    create_table :playlist_items do |t|
      t.integer :playlist_id, null: false
      t.integer :song_id, null: false

      t.timestamps
    end

    add_index :playlist_items, :playlist_id
    add_index :playlist_items, :song_id
  end
end
