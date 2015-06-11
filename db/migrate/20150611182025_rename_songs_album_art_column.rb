class RenameSongsAlbumArtColumn < ActiveRecord::Migration
  def change
    rename_column :songs, :album_art_url, :image_url
  end
end
