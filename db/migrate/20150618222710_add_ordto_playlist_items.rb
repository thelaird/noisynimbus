class AddOrdtoPlaylistItems < ActiveRecord::Migration
  def change
    add_column :playlist_items, :ord, :integer, null: false
    add_index :playlist_items, [:id, :ord], unique: true
  end
end
