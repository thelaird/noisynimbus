module Api
  class SearchController < ApiController

    def index
      @songsArtist = Song.find_by_fuzzy_artist(search_params[:query], limit: 5)
      @songsTitle = Song.find_by_fuzzy_title(search_params[:query], limit: 5)
      @tags = Tag.find_by_fuzzy_text(search_params[:query], limit: 5)
      @users = User.find_by_fuzzy_username(search_params[:query], limit: 5)
    end

    private

    def search_params
      params.require(:search).permit(:query)
    end
  end
end


search: fun () {
  var songs = new Collectoin, artists, tags, asdf;
  $.ajax({
      success: fun(response)
        songs.reset(response.songs);
        songs.reset(response.songs);
        songs.reset(response.songs);
  });
  make the view with the songs, artists, tags, asdf
  swapView
}
