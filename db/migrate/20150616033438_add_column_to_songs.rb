class AddColumnToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :large_image_url, :string
    rename_column :songs, :image_url, :small_image_url
  end
end
