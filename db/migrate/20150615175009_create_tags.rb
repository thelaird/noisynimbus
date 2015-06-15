class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :text, null: false

      t.timestamps
    end
    add_index :tags, :text
    add_index :songs, :artist
    add_index :songs, :title
  end
end
