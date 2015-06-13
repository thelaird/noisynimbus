class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.text :description

      t.timestamps
    end

    add_index :playlists, :user_id
  end
end
