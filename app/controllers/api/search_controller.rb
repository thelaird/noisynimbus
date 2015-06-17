module Api
  class SearchController < ApiController

    def index
      @songs_by_artist = Song.find_by_fuzzy_artist(search_params[:query], limit: 5)
      @songs_by_title = Song.find_by_fuzzy_title(search_params[:query], limit: 5)
      @tags = Tag.find_by_fuzzy_text(search_params[:query], limit: 5)
      @users = User.find_by_fuzzy_username(search_params[:query], limit: 5)
      render :index
    end

    private

    def search_params
      params.permit(:query)
    end
  end
end
