class CreateTagItems < ActiveRecord::Migration
  def change
    create_table :tag_items do |t|
      t.integer :tag_id, null: false
      t.integer :song_id, null: false

      t.timestamps
    end

    add_index :tag_items, [:tag_id, :song_id], unique: true
  end
end
